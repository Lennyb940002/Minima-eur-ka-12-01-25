import React from 'react';
import { Period } from './types';

interface SalesOverviewCardProps {
  title: string;
  value: string;
  period: Period;
  onPeriodChange: (period: Period) => void;
}

export function SalesOverviewCard({
  title,
  value,
  period,
  onPeriodChange
}: SalesOverviewCardProps) {
  return (
    <div className="bg-black border border-white/10 rounded-xl p-6">
      <div className="flex flex-col h-full">
        <h3 className="text-sm text-zinc-400 mb-2">{title}</h3>
        <p className="text-4xl font-bold mt-auto">{value}</p>
        <div className="mt-4 flex gap-2">
          {(['day', 'week', 'month'] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => onPeriodChange(p)}
              className={`px-3 py-1 rounded-full text-sm ${period === p
                ? 'bg-yellow-500 text-black'
                : 'bg-zinc-800 text-zinc-400'
                }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}