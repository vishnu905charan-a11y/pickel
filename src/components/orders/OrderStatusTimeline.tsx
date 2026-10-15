import React from 'react';
import type { DemoOrderStatus, OrderStatusHistoryEntry } from '../../types';
import { Check, Clock, Package, Truck, Home, AlertCircle } from 'lucide-react';

interface OrderStatusTimelineProps {
  currentStatus: DemoOrderStatus;
  history?: OrderStatusHistoryEntry[];
}

const ORDER_STEPS: DemoOrderStatus[] = [
  'Pending Confirmation',
  'Confirmed',
  'Preparing',
  'Dispatched',
  'Delivered',
];

export const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({
  currentStatus,
  history = [],
}) => {
  if (currentStatus === 'Cancelled') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h4 className="text-lg font-bold text-red-800">Order Cancelled (Demo)</h4>
        <p className="text-sm text-red-700 max-w-md mx-auto">
          This demo order was marked as cancelled. No items will be dispatched.
        </p>
      </div>
    );
  }

  const currentStepIndex = ORDER_STEPS.indexOf(currentStatus);

  const getStepIcon = (status: DemoOrderStatus) => {
    switch (status) {
      case 'Pending Confirmation':
        return <Clock className="w-4 h-4" />;
      case 'Confirmed':
        return <Check className="w-4 h-4" />;
      case 'Preparing':
        return <Package className="w-4 h-4" />;
      case 'Dispatched':
        return <Truck className="w-4 h-4" />;
      case 'Delivered':
        return <Home className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-pickle-cream-dark p-6 shadow-xs space-y-6">
      <h3 className="font-serif font-bold text-lg text-pickle-burgundy">
        Demo Order Status Timeline
      </h3>

      {/* Horizontal Progress Bar for Desktop / Tablet */}
      <div className="hidden sm:flex items-center justify-between relative px-2">
        {/* Background track line */}
        <div className="absolute top-5 left-8 right-8 h-1 bg-pickle-cream-dark -z-0" />
        
        {/* Active progress fill */}
        <div
          className="absolute top-5 left-8 h-1 bg-pickle-green transition-all duration-500 -z-0"
          style={{
            width: `${Math.max(0, (currentStepIndex / (ORDER_STEPS.length - 1)) * 90)}%`,
          }}
        />

        {ORDER_STEPS.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div key={step} className="flex flex-col items-center text-center relative z-10 w-24">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-xs ${
                  isCompleted
                    ? 'bg-pickle-green text-white'
                    : isCurrent
                    ? 'bg-pickle-red text-white ring-4 ring-pickle-red/20'
                    : 'bg-pickle-cream text-pickle-dark/40 border border-pickle-cream-dark'
                }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : getStepIcon(step)}
              </div>
              <span
                className={`text-xs mt-2 font-medium leading-tight ${
                  isCurrent
                    ? 'font-bold text-pickle-red'
                    : isCompleted
                    ? 'text-pickle-dark'
                    : 'text-pickle-dark/40'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* Vertical Status Timeline for Mobile */}
      <div className="sm:hidden space-y-4">
        {ORDER_STEPS.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div key={step} className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  isCompleted
                    ? 'bg-pickle-green text-white'
                    : isCurrent
                    ? 'bg-pickle-red text-white ring-4 ring-pickle-red/20'
                    : 'bg-pickle-cream text-pickle-dark/40 border'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : getStepIcon(step)}
              </div>
              <div>
                <p
                  className={`text-sm ${
                    isCurrent
                      ? 'font-bold text-pickle-red'
                      : isCompleted
                      ? 'font-semibold text-pickle-dark'
                      : 'text-pickle-dark/40'
                  }`}
                >
                  {step}
                </p>
                {isCurrent && (
                  <span className="text-[11px] text-pickle-green font-medium">
                    &bull; Current Step (Simulated)
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* History Log Table / Details */}
      {history.length > 0 && (
        <div className="pt-4 border-t border-pickle-cream-dark">
          <h4 className="text-xs font-bold text-pickle-dark/60 uppercase tracking-wider mb-2">
            Status Activity Log
          </h4>
          <div className="space-y-2 text-xs text-pickle-dark/70">
            {history.map((entry, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-lg bg-pickle-cream/30 border border-pickle-cream-dark/50"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-pickle-burgundy">{entry.status}</span>
                  <span className="text-pickle-dark/40 hidden sm:inline">&mdash;</span>
                  <span>{entry.note}</span>
                </div>
                <span className="text-[10px] text-pickle-dark/50 shrink-0 mt-1 sm:mt-0 font-mono">
                  {new Date(entry.timestamp).toLocaleString('en-IN', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
