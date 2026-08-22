'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  actionHref,
}) => {
  return (
    <div className="rounded-2xl border border-dashed border-emerald-800/80 bg-emerald-950/40 p-12 text-center flex flex-col items-center justify-center space-y-4">
      <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
        <Leaf className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-xs text-emerald-200/70 max-w-sm leading-relaxed">{description}</p>

      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="mt-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
};
