import React, { type ReactNode } from 'react';

interface AdminStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: string;
  badgeColor?: string;
}

export const AdminStatsCard: React.FC<AdminStatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  badgeColor = 'bg-pickle-cream text-pickle-burgundy',
}) => {
  return (
    <div className="bg-white rounded-2xl border border-pickle-cream-dark p-5 shadow-xs flex items-center justify-between gap-4">
      <div className="space-y-1">
        <span className="text-xs font-semibold text-pickle-dark/60 block">{title}</span>
        <span className="font-serif font-black text-2xl text-pickle-burgundy block">
          {value}
        </span>
        {(subtitle || trend) && (
          <div className="flex items-center gap-1.5 text-[11px] text-pickle-dark/50">
            {trend && <span className="text-pickle-green font-semibold">{trend}</span>}
            {subtitle && <span>{subtitle}</span>}
          </div>
        )}
      </div>

      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${badgeColor}`}>
        {icon}
      </div>
    </div>
  );
};
