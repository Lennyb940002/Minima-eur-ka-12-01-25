import React from 'react';
import { Platform } from './types';

interface PlatformCardProps {
  platform: Platform;
  onSelect: () => void;
}

export function PlatformCard({ platform, onSelect }: PlatformCardProps) {
  return (
    <div
      onClick={onSelect}
      className="bg-white/5 p-6 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10"
    >
      <h3 className="text-lg font-medium text-white mb-2">{platform.name}</h3>
      <p className="text-white/60 text-sm mb-4">{platform.frequency}</p>
      <button className="px-4 py-2 border border-white/20 rounded-lg text-white hover:bg-white/10">
        Planifier
      </button>
    </div>
  );
}