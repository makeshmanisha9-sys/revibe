'use client';

import React from 'react';
import { Badge } from '@/types/database';
import { Award, Lock, CheckCircle, Trophy, Sparkles } from 'lucide-react';

interface BadgesGridProps {
  badges: Badge[];
  currentEcoPoints?: number;
}

export function BadgesGrid({ badges, currentEcoPoints = 0 }: BadgesGridProps) {
  const getTierBadgeColor = (tier: Badge['tier']) => {
    switch (tier) {
      case 'Bronze':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Silver':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'Gold':
        return 'bg-yellow-100 text-yellow-900 border-yellow-300';
      case 'Emerald':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'Platinum':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      case 'Diamond':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      default:
        return 'bg-charcoal-100 text-charcoal-800 border-charcoal-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-charcoal-900">
            ReVIBE Eco Badges & Milestones
          </h3>
        </div>
        <span className="text-xs text-charcoal-500 font-semibold">
          {badges.filter((b) => b.unlocked).length} / {badges.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((b) => {
          const isUnlocked = b.unlocked || (b.required_points ? currentEcoPoints >= b.required_points : false);
          const progress = b.required_points ? Math.min(100, Math.round((currentEcoPoints / b.required_points) * 100)) : 100;

          return (
            <div
              key={b.key}
              className={`p-5 rounded-3xl border transition-all duration-200 flex flex-col justify-between space-y-3 ${
                isUnlocked
                  ? 'bg-white border-charcoal-200 shadow-soft'
                  : 'bg-charcoal-50/70 border-charcoal-200/60 opacity-70'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 rounded-2xl bg-charcoal-100/80 flex items-center justify-center text-2xl flex-shrink-0 shadow-xs">
                  {b.icon}
                </div>

                <div className="flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${getTierBadgeColor(b.tier)}`}>
                    {b.tier}
                  </span>
                  {isUnlocked ? (
                    <span className="p-1 rounded-full bg-emerald-100 text-emerald-700" title="Unlocked">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="p-1 rounded-full bg-charcoal-200 text-charcoal-500" title="Locked">
                      <Lock className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-black text-charcoal-900 leading-snug">
                  {b.name}
                </h4>
                <p className="text-xs text-charcoal-600 leading-relaxed font-normal">
                  {b.description}
                </p>
              </div>

              {/* Progress towards badge */}
              <div className="pt-2 border-t border-charcoal-100 space-y-1">
                <div className="flex justify-between text-[10px] text-charcoal-500 font-semibold">
                  <span>Criteria: {b.criteria}</span>
                  {b.required_points && <span>{progress}%</span>}
                </div>

                {!isUnlocked && b.required_points && (
                  <div className="h-1.5 w-full bg-charcoal-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
