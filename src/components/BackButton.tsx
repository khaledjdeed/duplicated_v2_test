import React from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
}

export function BackButton({ className = '' }: BackButtonProps) {
  const { goBack, canGoBack } = useNavigation();

  if (!canGoBack) return null;

  return (
    <button
      onClick={goBack}
      className={`inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors ${className}`}
    >
      <ArrowLeft className="h-4 w-4 mr-1" />
      Back
    </button>
  );
}