import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning'
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      icon: 'text-red-500',
      button: 'bg-red-600 hover:bg-red-700',
      bg: 'bg-red-50 dark:bg-red-900/20'
    },
    warning: {
      icon: 'text-yellow-500',
      button: 'bg-yellow-600 hover:bg-yellow-700',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    info: {
      icon: 'text-blue-500',
      button: 'bg-blue-600 hover:bg-blue-700',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    }
  };

  const styles = typeStyles[type];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-full ${styles.bg} mr-4`}>
              <AlertTriangle className={`h-6 w-6 ${styles.icon}`} />
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {message}
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onConfirm}
              className={`flex-1 text-white py-2 px-4 rounded-md transition-colors ${styles.button}`}
            >
              {confirmText}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}