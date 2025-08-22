import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw, AlertCircle } from 'lucide-react';
import { useOfflineSupport } from '../hooks/useOfflineSupport';
import { motion, AnimatePresence } from 'framer-motion';

export function NetworkStatus() {
  const { 
    isOnline, 
    pendingActions, 
    syncInProgress, 
    syncPendingActions,
    hasPendingActions 
  } = useOfflineSupport();
  
  const [showDetails, setShowDetails] = useState(false);
  const [lastOnlineTime, setLastOnlineTime] = useState<Date | null>(null);

  useEffect(() => {
    if (!isOnline && !lastOnlineTime) {
      setLastOnlineTime(new Date());
    } else if (isOnline) {
      setLastOnlineTime(null);
    }
  }, [isOnline, lastOnlineTime]);

  if (isOnline && !hasPendingActions) {
    return null; // Don't show anything when online and no pending actions
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-4 right-4 z-50"
      >
        <div className={`rounded-lg shadow-lg border p-4 max-w-sm ${
          isOnline 
            ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700'
            : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700'
        }`}>
          <div className="flex items-start space-x-3">
            <div className={`flex-shrink-0 ${isOnline ? 'text-blue-600' : 'text-red-600'}`}>
              {isOnline ? (
                <Wifi className="h-5 w-5" />
              ) : (
                <WifiOff className="h-5 w-5" />
              )}
            </div>
            
            <div className="flex-1">
              <h3 className={`text-sm font-medium ${
                isOnline ? 'text-blue-900 dark:text-blue-300' : 'text-red-900 dark:text-red-300'
              }`}>
                {isOnline ? 'Connection Restored' : 'You are offline'}
              </h3>
              
              <p className={`text-xs mt-1 ${
                isOnline ? 'text-blue-700 dark:text-blue-400' : 'text-red-700 dark:text-red-400'
              }`}>
                {isOnline 
                  ? hasPendingActions 
                    ? `Syncing ${pendingActions.length} pending changes...`
                    : 'All changes have been synced'
                  : 'Changes will be saved when connection is restored'
                }
              </p>

              {!isOnline && lastOnlineTime && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Last online: {lastOnlineTime.toLocaleTimeString()}
                </p>
              )}

              {hasPendingActions && (
                <div className="mt-2 space-y-2">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    {showDetails ? 'Hide' : 'Show'} pending changes ({pendingActions.length})
                  </button>

                  {isOnline && (
                    <button
                      onClick={syncPendingActions}
                      disabled={syncInProgress}
                      className="inline-flex items-center text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {syncInProgress ? (
                        <>
                          <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                          Syncing...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Sync Now
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}

              {showDetails && pendingActions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 space-y-1 max-h-32 overflow-y-auto"
                >
                  {pendingActions.map((action) => (
                    <div key={action.id} className="text-xs bg-white dark:bg-gray-800 p-2 rounded border">
                      <div className="flex items-center justify-between">
                        <span className="font-medium capitalize">
                          {action.type} {action.table}
                        </span>
                        {action.retryCount > 0 && (
                          <span className="text-yellow-600 dark:text-yellow-400">
                            Retry {action.retryCount}/3
                          </span>
                        )}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {action.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}