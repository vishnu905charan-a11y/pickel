import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-1">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm text-pickle-dark/60">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-pickle-red transition-colors text-pickle-dark/70"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5 text-pickle-dark/40" />
              </li>
              <li>
                {item.href && !isLast ? (
                  <Link
                    to={item.href}
                    className="hover:text-pickle-red transition-colors text-pickle-dark/70 font-normal"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="font-medium text-pickle-burgundy truncate max-w-[200px] sm:max-w-xs inline-block align-bottom"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
