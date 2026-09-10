import React from 'react';

export function LoadingSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-3xl bg-white border border-charcoal-200 overflow-hidden shadow-soft p-4 space-y-4 animate-pulse">
          <div className="aspect-video w-full bg-charcoal-100 rounded-2xl" />
          <div className="space-y-2">
            <div className="h-4 bg-charcoal-100 rounded-md w-3/4" />
            <div className="h-3 bg-charcoal-100 rounded-md w-1/2" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="h-6 bg-charcoal-100 rounded-lg w-1/4" />
            <div className="h-8 bg-charcoal-100 rounded-xl w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
