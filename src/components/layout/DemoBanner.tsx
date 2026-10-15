import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DemoBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-pickle-burgundy text-pickle-cream px-4 py-2 text-xs sm:text-sm font-medium border-b border-pickle-mustard/30 relative z-40 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="bg-pickle-mustard text-pickle-burgundy text-[10px] font-bold uppercase px-1.5 py-0.5 rounded tracking-wide shrink-0">
            DEMO ONLY
          </span>
          <p className="truncate">
            <span className="font-semibold">Frontend Demonstration Storefront.</span> No real payments or orders are transmitted to Pickle Mart.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/admin"
            className="hidden sm:inline-block underline hover:text-pickle-mustard transition-colors text-xs"
          >
            Explore Demo Admin &rarr;
          </Link>
          <button
            onClick={() => setIsVisible(false)}
            className="text-pickle-cream/70 hover:text-white p-0.5"
            aria-label="Dismiss demo notice banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
