import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShieldCheck } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  subtitle,
  action,
}) => {
  return (
    <header className="bg-white border-b border-pickle-cream-dark px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="font-serif font-bold text-2xl text-pickle-burgundy leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-pickle-dark/60 mt-1">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1.5 text-xs text-pickle-green bg-green-50 border border-pickle-green/20 px-3 py-1.5 rounded-full font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Demo State Active</span>
        </div>

        <Link
          to="/products"
          target="_blank"
          className="text-xs text-pickle-burgundy hover:text-pickle-red flex items-center gap-1 font-semibold px-3 py-1.5 rounded-lg border border-pickle-cream-dark hover:bg-pickle-cream/40 transition-colors"
        >
          <span>View Public Store</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {action}
      </div>
    </header>
  );
};
