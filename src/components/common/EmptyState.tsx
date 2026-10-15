import React, { type ReactNode } from 'react';
import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-pickle-cream/30 rounded-2xl border border-dashed border-pickle-cream-dark my-6">
      <div className="w-16 h-16 rounded-full bg-pickle-cream flex items-center justify-center text-pickle-red mb-4">
        {icon || <PackageOpen className="w-8 h-8" />}
      </div>
      <h3 className="text-xl font-serif font-bold text-pickle-burgundy mb-2">{title}</h3>
      <p className="text-pickle-dark/70 text-sm max-w-md mb-6">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-5 py-2.5 rounded-lg bg-pickle-red text-white hover:bg-pickle-burgundy font-medium text-sm transition-colors shadow-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
