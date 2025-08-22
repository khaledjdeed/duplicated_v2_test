import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { errorHandler } from '../lib/errorHandler';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: crypto.randomUUID()
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });

    // Log error to our error handling system
    errorHandler.handleError({
      code: 'REACT_ERROR_BOUNDARY',
      message: error.message,
      details: {
        componentStack: errorInfo.componentStack,
        errorBoundary: this.constructor.name
      },
      timestamp: new Date(),
      severity: 'high',
      recoverable: true,
      context: 'react'
    }, error.stack);

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportBug = () => {
    const errorReport = {
      errorId: this.state.errorId,
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString()
    };

    // In production, this would send to your bug tracking system
    console.log('Bug report:', errorReport);
    
    // Copy to clipboard for easy reporting
    navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2))
      .then(() => alert('Error details copied to clipboard'))
      .catch(() => alert('Error details logged to console'));
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Something went wrong
              </h2>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                We encountered an unexpected error. Don't worry, our team has been notified and is working on a fix.
              </p>

              {import.meta.env.DEV && this.state.error && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-left">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Error Details (Development Mode)
                  </h3>
                  <p className="text-xs text-red-600 dark:text-red-400 font-mono break-all">
                    {this.state.error.message}
                  </p>
                  {this.state.errorId && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Error ID: {this.state.errorId}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={this.handleRetry}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </button>
                
                <button
                  onClick={this.handleGoHome}
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:ring-2 focus:ring-gray-500 focus:outline-none"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go to Dashboard
                </button>

                <button
                  onClick={this.handleReportBug}
                  className="w-full inline-flex items-center justify-center px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors focus:ring-2 focus:ring-gray-500 focus:outline-none"
                >
                  <Bug className="h-4 w-4 mr-2" />
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}