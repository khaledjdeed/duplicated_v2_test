import React from 'react';
import { AlertTriangle, RefreshCw, Home, Wifi } from 'lucide-react';

interface ApiErrorProps {
  error: {
    status?: number;
    message: string;
    code?: string;
  };
  onRetry?: () => void;
  onGoHome?: () => void;
  className?: string;
}

export function ApiErrorHandler({ error, onRetry, onGoHome, className = '' }: ApiErrorProps) {
  const getErrorIcon = () => {
    if (error.status === 0 || error.code === 'NETWORK_ERROR') {
      return <Wifi className="h-8 w-8 text-orange-600" />;
    }
    return <AlertTriangle className="h-8 w-8 text-red-600" />;
  };

  const getErrorTitle = () => {
    switch (error.status) {
      case 0:
      case undefined:
        return 'Connection Problem';
      case 400:
        return 'Invalid Request';
      case 401:
        return 'Authentication Required';
      case 403:
        return 'Access Denied';
      case 404:
        return 'Not Found';
      case 429:
        return 'Too Many Requests';
      case 500:
        return 'Server Error';
      case 503:
        return 'Service Unavailable';
      default:
        return 'Something Went Wrong';
    }
  };

  const getErrorDescription = () => {
    switch (error.status) {
      case 0:
      case undefined:
        return 'Unable to connect to the server. Please check your internet connection and try again.';
      case 400:
        return 'The request was invalid. Please check your input and try again.';
      case 401:
        return 'Your session has expired. Please sign in again to continue.';
      case 403:
        return 'You do not have permission to access this resource.';
      case 404:
        return 'The requested resource could not be found.';
      case 429:
        return 'You have made too many requests. Please wait a moment and try again.';
      case 500:
        return 'A server error occurred. Our team has been notified and is working on a fix.';
      case 503:
        return 'The service is temporarily unavailable. Please try again later.';
      default:
        return error.message || 'An unexpected error occurred. Please try again.';
    }
  };

  const shouldShowRetry = () => {
    return error.status !== 403 && error.status !== 404 && onRetry;
  };

  const shouldShowGoHome = () => {
    return error.status === 403 || error.status === 404 || !onRetry;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
          {getErrorIcon()}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {getErrorTitle()}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          {getErrorDescription()}
        </p>

        {import.meta.env.DEV && error.code && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Error Code: {error.code}
            </p>
            {error.status && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Status: {error.status}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {shouldShowRetry() && (
            <button
              onClick={onRetry}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </button>
          )}
          
          {shouldShowGoHome() && onGoHome && (
            <button
              onClick={onGoHome}
              className="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:ring-2 focus:ring-gray-500 focus:outline-none"
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Higher-order component for API error handling
export function withApiErrorHandler<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function ApiErrorHandlerWrapper(props: P) {
    const [error, setError] = React.useState<any>(null);
    const [retryAction, setRetryAction] = React.useState<(() => void) | null>(null);

    const handleError = (err: any, retry?: () => void) => {
      setError(err);
      setRetryAction(() => retry);
    };

    const handleRetry = () => {
      setError(null);
      if (retryAction) {
        retryAction();
      }
    };

    const handleGoHome = () => {
      setError(null);
      window.location.href = '/dashboard';
    };

    if (error) {
      return (
        <ApiErrorHandler
          error={error}
          onRetry={retryAction ? handleRetry : undefined}
          onGoHome={handleGoHome}
        />
      );
    }

    return <WrappedComponent {...props} onError={handleError} />;
  };
}