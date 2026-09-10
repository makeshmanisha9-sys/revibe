'use client';

import React from 'react';
import { WasteDNA } from '@/types/database';
import { Dna, Zap, TrendingUp, Layers, Tag, HelpCircle, ShieldCheck } from 'lucide-react';

interface WasteDNACardProps {
  dna: WasteDNA;
}

export function WasteDNACard({ dna }: WasteDNACardProps) {
  return (
    <div className="p-6 rounded-3xl bg-white border border-charcoal-200 shadow-soft space-y-6">
      <div className="flex items-center justify-between border-b border-charcoal-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-100/80 text-emerald-800">
            <Dna className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-charcoal-900 flex items-center gap-1.5">
              <span>🧬 Waste DNA Profile</span>
            </h3>
            <p className="text-xs text-charcoal-500">Biometric & Chemical Reuse Profile</p>
          </div>
        </div>

        {dna.isEstimated && (
          <span className="px-2.5 py-1 rounded-full bg-sand-100 border border-sand-200 text-charcoal-600 text-[10px] font-bold tracking-wide">
            Estimated Data
          </span>
        )}
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-3.5 rounded-2xl bg-charcoal-50 border border-charcoal-100">
          <span className="text-[10px] uppercase font-bold text-charcoal-400 block tracking-wider">Material</span>
          <span className="text-xs font-bold text-charcoal-900 mt-1 block truncate" title={dna.material}>
            {dna.material}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-charcoal-50 border border-charcoal-100">
          <span className="text-[10px] uppercase font-bold text-charcoal-400 block tracking-wider">Reusability</span>
          <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-700 mt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{dna.reusability}</span>
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-charcoal-50 border border-charcoal-100">
          <span className="text-[10px] uppercase font-bold text-charcoal-400 block tracking-wider">Transformation</span>
          <span className="text-xs font-black text-charcoal-900 mt-1 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{dna.transformationPotential}%</span>
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-charcoal-50 border border-charcoal-100">
          <span className="text-[10px] uppercase font-bold text-charcoal-400 block tracking-wider">Difficulty</span>
          <span className="text-xs font-bold text-charcoal-800 mt-1 block">
            {dna.difficulty}
          </span>
        </div>
      </div>

      {/* Potential Value Range Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-charcoal-50 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Potential Value Creation</span>
          </span>
          <p className="text-xs text-charcoal-600">Calculated value multiplication after upcycling transformation</p>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-base font-black text-emerald-900">
            ₹{dna.potentialValueMin} <span className="text-charcoal-400 text-xs font-normal">→</span> ₹{dna.potentialValueMax}
          </div>
          <span className="text-[10px] font-semibold text-emerald-700">~{Math.round((dna.potentialValueMax / dna.potentialValueMin) * 100)}% Value Expansion</span>
        </div>
      </div>

      {/* Possible Product Categories */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
          Possible Product Blueprints
        </span>
        <div className="flex flex-wrap gap-2">
          {dna.possibleProductCategories.map((cat, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-xl bg-charcoal-100/70 hover:bg-emerald-50 hover:text-emerald-800 border border-charcoal-200/80 text-xs font-semibold text-charcoal-700 transition-colors"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
