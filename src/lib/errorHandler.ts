export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  userId?: string;
  context?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recoverable: boolean;
}

export interface ErrorLogEntry {
  id: string;
  error: AppError;
  userAgent: string;
  url: string;
  stackTrace?: string;
  userId?: string;
  sessionId: string;
  timestamp: Date;
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorQueue: ErrorLogEntry[] = [];
  private isOnline = navigator.onLine;
  private sessionId = crypto.randomUUID();

  private constructor() {
    this.setupGlobalErrorHandlers();
    this.setupNetworkListeners();
  }

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  private setupGlobalErrorHandlers() {
    // Handle unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      this.handleError({
        code: 'UNHANDLED_ERROR',
        message: event.message,
        details: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error?.stack
        },
        timestamp: new Date(),
        severity: 'high',
        recoverable: false,
        context: 'global'
      });
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        code: 'UNHANDLED_PROMISE_REJECTION',
        message: event.reason?.message || 'Unhandled promise rejection',
        details: {
          reason: event.reason,
          stack: event.reason?.stack
        },
        timestamp: new Date(),
        severity: 'high',
        recoverable: false,
        context: 'promise'
      });
    });
  }

  private setupNetworkListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushErrorQueue();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  public handleError(error: AppError, stackTrace?: string): void {
    const errorEntry: ErrorLogEntry = {
      id: crypto.randomUUID(),
      error,
      userAgent: navigator.userAgent,
      url: window.location.href,
      stackTrace,
      sessionId: this.sessionId,
      timestamp: new Date()
    };

    // Add to queue for offline support
    this.errorQueue.push(errorEntry);

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('Error logged:', errorEntry);
    }

    // Try to send immediately if online
    if (this.isOnline) {
      this.sendErrorLog(errorEntry);
    }

    // Show user-friendly message based on severity
    this.showUserMessage(error);
  }

  private async sendErrorLog(errorEntry: ErrorLogEntry): Promise<void> {
    try {
      // In production, this would send to your error logging service
      // For now, we'll simulate the API call
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorEntry),
      });

      // Remove from queue if sent successfully
      this.errorQueue = this.errorQueue.filter(e => e.id !== errorEntry.id);
    } catch (sendError) {
      // Keep in queue for retry
      console.warn('Failed to send error log:', sendError);
    }
  }

  private async flushErrorQueue(): Promise<void> {
    const queueCopy = [...this.errorQueue];
    for (const errorEntry of queueCopy) {
      await this.sendErrorLog(errorEntry);
    }
  }

  private showUserMessage(error: AppError): void {
    // This will be handled by the ErrorBoundary and toast notifications
    const event = new CustomEvent('app-error', { detail: error });
    window.dispatchEvent(event);
  }

  // Specific error creators
  public createNetworkError(originalError: any): AppError {
    return {
      code: 'NETWORK_ERROR',
      message: 'Unable to connect to the server. Please check your internet connection.',
      details: originalError,
      timestamp: new Date(),
      severity: 'medium',
      recoverable: true,
      context: 'network'
    };
  }

  public createValidationError(field: string, message: string): AppError {
    return {
      code: 'VALIDATION_ERROR',
      message: `Validation failed: ${message}`,
      details: { field },
      timestamp: new Date(),
      severity: 'low',
      recoverable: true,
      context: 'validation'
    };
  }

  public createAPIError(status: number, message: string, endpoint: string): AppError {
    return {
      code: `API_ERROR_${status}`,
      message: this.getAPIErrorMessage(status, message),
      details: { status, endpoint, originalMessage: message },
      timestamp: new Date(),
      severity: status >= 500 ? 'high' : 'medium',
      recoverable: status < 500,
      context: 'api'
    };
  }

  public createAuthError(message: string): AppError {
    return {
      code: 'AUTH_ERROR',
      message: 'Authentication failed. Please sign in again.',
      details: { originalMessage: message },
      timestamp: new Date(),
      severity: 'medium',
      recoverable: true,
      context: 'auth'
    };
  }

  private getAPIErrorMessage(status: number, originalMessage: string): string {
    switch (status) {
      case 400:
        return 'Invalid request. Please check your input and try again.';
      case 401:
        return 'You are not authorized to perform this action. Please sign in.';
      case 403:
        return 'You do not have permission to access this resource.';
      case 404:
        return 'The requested resource was not found.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      case 500:
        return 'Server error. Our team has been notified and is working on a fix.';
      case 503:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return originalMessage || 'An unexpected error occurred. Please try again.';
    }
  }

  public isOnlineStatus(): boolean {
    return this.isOnline;
  }

  public getQueuedErrorCount(): number {
    return this.errorQueue.length;
  }
}

export const errorHandler = ErrorHandler.getInstance();