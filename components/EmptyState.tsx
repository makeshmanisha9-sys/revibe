import React from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="p-8 sm:p-12 rounded-3xl bg-white border border-charcoal-200 text-center space-y-4 max-w-lg mx-auto shadow-soft">
      <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
        <Icon className="w-7 h-7" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-black text-charcoal-900">{title}</h3>
        <p className="text-xs text-charcoal-500 leading-relaxed max-w-sm mx-auto">
          {description}
        </p>
      </div>

      {(actionText && (actionHref || onAction)) && (
        <div className="pt-2">
          {actionHref ? (
            <Link
              href={actionHref}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors btn-press shadow-soft"
            >
              <span>{actionText}</span>
            </Link>
          ) : (
            <button
              onClick={onAction}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors btn-press shadow-soft"
            >
              <span>{actionText}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
