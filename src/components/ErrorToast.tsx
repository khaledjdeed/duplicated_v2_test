import React, { useEffect, useState } from 'react';
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function ErrorToast({ 
  id, 
  type, 
  title, 
  message, 
  duration = 5000, 
  onClose, 
  action 
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (duration > 0) {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 100) {
            setIsVisible(false);
            setTimeout(() => onClose(id), 300);
            return 0;
          }
          return prev - 100;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [duration, id, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700';
      case 'error':
        return 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700';
      case 'info':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700';
    }
  };

  const getProgressColor = () => {
    switch (type) {
      case 'success': return 'bg-green-600';
      case 'error': return 'bg-red-600';
      case 'warning': return 'bg-yellow-600';
      case 'info': return 'bg-blue-600';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.9 }}
          className={`max-w-sm w-full rounded-lg shadow-lg border p-4 ${getColors()}`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {getIcon()}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {message}
              </p>
              
              {action && (
                <button
                  onClick={action.onClick}
                  className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  {action.label}
                </button>
              )}
            </div>
            
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => onClose(id), 300);
              }}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          {/* Progress bar */}
          {duration > 0 && (
            <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
              <motion.div
                className={`h-1 rounded-full ${getProgressColor()}`}
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Toast manager component
interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function ToastManager() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleAppError = (event: CustomEvent) => {
      const error = event.detail;
      addToast({
        type: 'error',
        title: getErrorTitle(error.severity),
        message: error.message,
        duration: error.severity === 'critical' ? 8000 : 5000
      });
    };

    window.addEventListener('app-error', handleAppError as EventListener);
    return () => {
      window.removeEventListener('app-error', handleAppError as EventListener);
    };
  }, []);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const newToast: Toast = {
      ...toast,
      id: crypto.randomUUID()
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const getErrorTitle = (severity: string) => {
    switch (severity) {
      case 'critical': return 'Critical Error';
      case 'high': return 'Error';
      case 'medium': return 'Warning';
      case 'low': return 'Notice';
      default: return 'Notification';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ErrorToast
            key={toast.id}
            {...toast}
            onClose={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}