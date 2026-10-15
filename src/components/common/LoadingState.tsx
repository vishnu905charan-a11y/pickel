import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading traditional flavors...',
  size = 'md',
}) => {
  const spinnerSizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center" role="status" aria-live="polite">
      <Loader2 className={`${spinnerSizes[size]} text-pickle-red animate-spin mb-3`} />
      <p className="text-sm text-pickle-dark/70 font-medium">{message}</p>
    </div>
  );
};
