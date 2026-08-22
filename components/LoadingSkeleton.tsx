'use client';

import React from 'react';

export const LoadingSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl bg-emerald-950/60 border border-emerald-900/60 p-4 space-y-4">
          <div className="aspect-video bg-emerald-900/40 rounded-xl" />
          <div className="space-y-2">
            <div className="h-4 bg-emerald-900/60 rounded w-3/4" />
            <div className="h-3 bg-emerald-900/40 rounded w-1/2" />
          </div>
          <div className="h-8 bg-emerald-900/60 rounded-xl w-full" />
        </div>
      ))}
    </div>
  );
};
