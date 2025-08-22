import { useCallback, useEffect, useState } from 'react';
import { errorHandler, AppError } from '../lib/errorHandler';
import toast from 'react-hot-toast';
import { useAuth } from './useAuth';

export interface UseErrorHandlerReturn {
  handleError: (error: AppError | Error, context?: string) => void;
  handleNetworkError: (error: any, endpoint?: string) => void;
  handleValidationError: (field: string, message: string) => void;
  handleAPIError: (status: number, message: string, endpoint: string) => void;
  isOnline: boolean;
  queuedErrorCount: number;
  clearError: () => void;
  retryLastAction: () => void;
}

export function useErrorHandler(): UseErrorHandlerReturn {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queuedErrorCount, setQueuedErrorCount] = useState(0);
  const [lastAction, setLastAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    const handleAppError = (event: CustomEvent<AppError>) => {
      const error = event.detail;
      showUserFriendlyMessage(error);
    };

    window.addEventListener('app-error', handleAppError as EventListener);
    return () => {
      window.removeEventListener('app-error', handleAppError as EventListener);
    };
  }, []);

  const showUserFriendlyMessage = useCallback((error: AppError) => {
    const toastOptions = {
      duration: error.severity === 'critical' ? 8000 : 4000,
      position: 'top-right' as const,
    };

    switch (error.severity) {
      case 'critical':
        toast.error(error.message, {
          ...toastOptions,
          icon: '🚨',
        });
        break;
      case 'high':
        toast.error(error.message, toastOptions);
        break;
      case 'medium':
        toast.error(error.message, toastOptions);
        break;
      case 'low':
        toast(error.message, {
          ...toastOptions,
          icon: '⚠️',
        });
        break;
    }
  }, []);

  const handleError = useCallback((error: AppError | Error, context?: string) => {
    let appError: AppError;

    if (error instanceof Error) {
      appError = {
        code: 'GENERIC_ERROR',
        message: error.message,
        details: { stack: error.stack },
        timestamp: new Date(),
        userId: user?.id,
        context: context || 'unknown',
        severity: 'medium',
        recoverable: true
      };
    } else {
      appError = {
        ...error,
        userId: user?.id,
        context: context || error.context || 'unknown'
      };
    }

    errorHandler.handleError(appError);
    setQueuedErrorCount(errorHandler.getQueuedErrorCount());
  }, [user]);

  const handleNetworkError = useCallback((error: any, endpoint?: string) => {
    const networkError = errorHandler.createNetworkError(error);
    networkError.details = { ...networkError.details, endpoint };
    networkError.userId = user?.id;
    
    errorHandler.handleError(networkError);
    setQueuedErrorCount(errorHandler.getQueuedErrorCount());

    // Show offline message if applicable
    if (!isOnline) {
      toast.error('You are currently offline. Changes will be saved when connection is restored.', {
        duration: 6000,
        icon: '📡',
      });
    }
  }, [user, isOnline]);

  const handleValidationError = useCallback((field: string, message: string) => {
    const validationError = errorHandler.createValidationError(field, message);
    validationError.userId = user?.id;
    
    errorHandler.handleError(validationError);
    
    // Don't show toast for validation errors, they should be handled in forms
  }, [user]);

  const handleAPIError = useCallback((status: number, message: string, endpoint: string) => {
    const apiError = errorHandler.createAPIError(status, message, endpoint);
    apiError.userId = user?.id;
    
    errorHandler.handleError(apiError);
    setQueuedErrorCount(errorHandler.getQueuedErrorCount());
  }, [user]);

  const clearError = useCallback(() => {
    toast.dismiss();
  }, []);

  const retryLastAction = useCallback(() => {
    if (lastAction) {
      lastAction();
      setLastAction(null);
    }
  }, [lastAction]);

  return {
    handleError,
    handleNetworkError,
    handleValidationError,
    handleAPIError,
    isOnline,
    queuedErrorCount,
    clearError,
    retryLastAction
  };
}