import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface FormError {
  field: string;
  message: string;
}

interface FormErrorHandlerProps {
  errors: FormError[];
  onClearError?: (field: string) => void;
  className?: string;
}

export function FormErrorHandler({ errors, onClearError, className = '' }: FormErrorHandlerProps) {
  if (errors.length === 0) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      {errors.map((error) => (
        <div
          key={error.field}
          className="flex items-start space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg"
        >
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-800 dark:text-red-300">
              <span className="font-medium capitalize">{error.field}:</span> {error.message}
            </p>
          </div>
          {onClearError && (
            <button
              onClick={() => onClearError(error.field)}
              className="text-red-400 hover:text-red-600 dark:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

// Hook for form validation and error handling
export function useFormValidation<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Record<keyof T, (value: any) => string | null>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormError[]>([]);
  const [touched, setTouchedState] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);

  const validateField = (field: keyof T, value: any): string | null => {
    const rule = validationRules[field];
    return rule ? rule(value) : null;
  };

  const validateAll = (): boolean => {
    const newErrors: FormError[] = [];
    
    Object.keys(validationRules).forEach((field) => {
      const error = validateField(field as keyof T, values[field as keyof T]);
      if (error) {
        newErrors.push({ field: field as string, message: error });
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const setValue = (field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Validate field if it has been touched
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => {
        const filtered = prev.filter(e => e.field !== field);
        return error ? [...filtered, { field: field as string, message: error }] : filtered;
      });
    }
  };

  const setTouched = (field: keyof T) => {
    setTouchedState(prev => ({ ...prev, [field]: true }));
    
    // Validate field when touched
    const error = validateField(field, values[field]);
    if (error) {
      setErrors(prev => {
        const filtered = prev.filter(e => e.field !== field);
        return [...filtered, { field: field as string, message: error }];
      });
    }
  };

  const clearError = (field: string) => {
    setErrors(prev => prev.filter(e => e.field !== field));
  };

  const reset = () => {
    setValues(initialValues);
    setErrors([]);
    setTouchedState({} as Record<keyof T, boolean>);
  };

  return {
    values,
    errors,
    touched,
    setValue,
    setTouched,
    validateAll,
    clearError,
    reset,
    isValid: errors.length === 0
  };
}