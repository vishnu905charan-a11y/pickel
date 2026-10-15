import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  homeLink?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an unexpected issue while loading this page.',
  onRetry,
  homeLink = true,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-red-50/50 rounded-2xl border border-red-200 my-6">
      <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-pickle-red mb-4">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-serif font-bold text-pickle-burgundy mb-2">{title}</h3>
      <p className="text-pickle-dark/70 text-sm max-w-md mb-6">{message}</p>
      <div className="flex items-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-pickle-red text-white hover:bg-pickle-burgundy font-medium text-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
        )}
        {homeLink && (
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-pickle-cream hover:bg-pickle-cream-dark text-pickle-dark font-medium text-sm transition-colors"
          >
            Return to Home
          </Link>
        )}
      </div>
    </div>
  );
};
