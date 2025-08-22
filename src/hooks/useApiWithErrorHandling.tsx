import { useState, useCallback } from 'react';
import { useErrorHandler } from './useErrorHandler';
import { useOfflineSupport } from './useOfflineSupport';
import { supabase } from '../lib/supabase';

interface ApiOptions {
  retryCount?: number;
  retryDelay?: number;
  timeout?: number;
  offlineSupport?: boolean;
}

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: any;
}

export function useApiWithErrorHandling<T = any>(
  initialData: T | null = null,
  options: ApiOptions = {}
) {
  const [state, setState] = useState<ApiState<T>>({
    data: initialData,
    loading: false,
    error: null
  });

  const { handleAPIError, handleNetworkError, isOnline } = useErrorHandler();
  const { queueAction } = useOfflineSupport();

  const {
    retryCount = 3,
    retryDelay = 1000,
    timeout = 10000,
    offlineSupport = true
  } = options;

  const executeWithRetry = useCallback(async (
    operation: () => Promise<any>,
    currentRetry = 0
  ): Promise<any> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const result = await operation();
      clearTimeout(timeoutId);
      return result;
    } catch (error: any) {
      if (currentRetry < retryCount) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, currentRetry)));
        return executeWithRetry(operation, currentRetry + 1);
      }
      throw error;
    }
  }, [retryCount, retryDelay, timeout]);

  const apiCall = useCallback(async (
    operation: () => Promise<any>,
    operationName?: string
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await executeWithRetry(operation);
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (error: any) {
      // Handle different types of errors
      if (error.name === 'AbortError') {
        handleNetworkError(error, operationName);
      } else if (error.status) {
        handleAPIError(error.status, error.message, operationName || 'unknown');
      } else if (!isOnline) {
        handleNetworkError(error, operationName);
      } else {
        handleAPIError(500, error.message, operationName || 'unknown');
      }

      setState(prev => ({ ...prev, loading: false, error }));
      throw error;
    }
  }, [executeWithRetry, handleAPIError, handleNetworkError, isOnline]);

  // Supabase-specific operations with error handling
  const supabaseSelect = useCallback(async (
    table: string,
    query?: string,
    options?: { columns?: string; filters?: Record<string, any> }
  ) => {
    return apiCall(async () => {
      let queryBuilder = supabase.from(table).select(options?.columns || '*');
      
      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          queryBuilder = queryBuilder.eq(key, value);
        });
      }

      const { data, error } = await queryBuilder;
      if (error) throw error;
      return data;
    }, `SELECT ${table}`);
  }, [apiCall]);

  const supabaseInsert = useCallback(async (
    table: string,
    data: any
  ) => {
    if (!isOnline && offlineSupport) {
      // Queue for offline sync
      const actionId = queueAction({
        type: 'create',
        table,
        data
      });
      
      setState(prev => ({ 
        ...prev, 
        data: { ...data, id: actionId, _offline: true } as T,
        loading: false 
      }));
      
      return { ...data, id: actionId, _offline: true };
    }

    return apiCall(async () => {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    }, `INSERT ${table}`);
  }, [apiCall, isOnline, offlineSupport, queueAction]);

  const supabaseUpdate = useCallback(async (
    table: string,
    id: string,
    data: any
  ) => {
    if (!isOnline && offlineSupport) {
      // Queue for offline sync
      queueAction({
        type: 'update',
        table,
        data: { ...data, id }
      });
      
      setState(prev => ({ 
        ...prev, 
        data: { ...prev.data, ...data, _offline: true } as T,
        loading: false 
      }));
      
      return { ...data, id, _offline: true };
    }

    return apiCall(async () => {
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return result;
    }, `UPDATE ${table}`);
  }, [apiCall, isOnline, offlineSupport, queueAction]);

  const supabaseDelete = useCallback(async (
    table: string,
    id: string
  ) => {
    if (!isOnline && offlineSupport) {
      // Queue for offline sync
      queueAction({
        type: 'delete',
        table,
        data: { id }
      });
      
      setState(prev => ({ ...prev, data: null, loading: false }));
      return { id };
    }

    return apiCall(async () => {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return { id };
    }, `DELETE ${table}`);
  }, [apiCall, isOnline, offlineSupport, queueAction]);

  const retry = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    retry,
    supabaseSelect,
    supabaseInsert,
    supabaseUpdate,
    supabaseDelete,
    isOnline
  };
}