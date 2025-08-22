import { useState, useEffect, useCallback } from 'react';
import { useErrorHandler } from './useErrorHandler';

interface OfflineAction {
  id: string;
  type: 'create' | 'update' | 'delete';
  table: string;
  data: any;
  timestamp: Date;
  retryCount: number;
}

export function useOfflineSupport() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState<OfflineAction[]>([]);
  const [syncInProgress, setSyncInProgress] = useState(false);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncPendingActions();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load pending actions from localStorage
    loadPendingActions();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadPendingActions = () => {
    try {
      const stored = localStorage.getItem('mco-pending-actions');
      if (stored) {
        const actions = JSON.parse(stored).map((action: any) => ({
          ...action,
          timestamp: new Date(action.timestamp)
        }));
        setPendingActions(actions);
      }
    } catch (error) {
      console.warn('Failed to load pending actions:', error);
    }
  };

  const savePendingActions = (actions: OfflineAction[]) => {
    try {
      localStorage.setItem('mco-pending-actions', JSON.stringify(actions));
    } catch (error) {
      console.warn('Failed to save pending actions:', error);
    }
  };

  const queueAction = useCallback((action: Omit<OfflineAction, 'id' | 'timestamp' | 'retryCount'>) => {
    const newAction: OfflineAction = {
      ...action,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      retryCount: 0
    };

    const updatedActions = [...pendingActions, newAction];
    setPendingActions(updatedActions);
    savePendingActions(updatedActions);

    return newAction.id;
  }, [pendingActions]);

  const syncPendingActions = useCallback(async () => {
    if (!isOnline || pendingActions.length === 0 || syncInProgress) {
      return;
    }

    setSyncInProgress(true);

    const actionsToSync = [...pendingActions];
    const successfulActions: string[] = [];

    for (const action of actionsToSync) {
      try {
        await executeAction(action);
        successfulActions.push(action.id);
      } catch (error) {
        // Increment retry count
        const updatedAction = {
          ...action,
          retryCount: action.retryCount + 1
        };

        // Remove action if it has failed too many times
        if (updatedAction.retryCount >= 3) {
          handleError({
            code: 'OFFLINE_SYNC_FAILED',
            message: `Failed to sync ${action.type} action for ${action.table} after 3 attempts`,
            details: { action },
            timestamp: new Date(),
            severity: 'medium',
            recoverable: false,
            context: 'offline-sync'
          });
          successfulActions.push(action.id); // Remove from queue
        } else {
          // Update the action with new retry count
          setPendingActions(prev => 
            prev.map(a => a.id === action.id ? updatedAction : a)
          );
        }
      }
    }

    // Remove successful actions
    const remainingActions = pendingActions.filter(
      action => !successfulActions.includes(action.id)
    );
    
    setPendingActions(remainingActions);
    savePendingActions(remainingActions);
    setSyncInProgress(false);

    if (successfulActions.length > 0) {
      toast.success(`Synced ${successfulActions.length} offline changes`);
    }
  }, [isOnline, pendingActions, syncInProgress, handleError]);

  const executeAction = async (action: OfflineAction): Promise<void> => {
    // This would integrate with your Supabase client
    const { supabase } = await import('../lib/supabase');

    switch (action.type) {
      case 'create':
        const { error: createError } = await supabase
          .from(action.table)
          .insert(action.data);
        if (createError) throw createError;
        break;

      case 'update':
        const { error: updateError } = await supabase
          .from(action.table)
          .update(action.data)
          .eq('id', action.data.id);
        if (updateError) throw updateError;
        break;

      case 'delete':
        const { error: deleteError } = await supabase
          .from(action.table)
          .delete()
          .eq('id', action.data.id);
        if (deleteError) throw deleteError;
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  };

  const clearPendingActions = useCallback(() => {
    setPendingActions([]);
    localStorage.removeItem('mco-pending-actions');
  }, []);

  return {
    isOnline,
    pendingActions,
    syncInProgress,
    queueAction,
    syncPendingActions,
    clearPendingActions,
    hasPendingActions: pendingActions.length > 0
  };
}