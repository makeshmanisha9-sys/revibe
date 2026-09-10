'use client';

import React from 'react';
import { DashboardStats } from '@/types/database';
import { Recycle, Droplets, CloudFog, TrendingUp, Gift, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface ImpactWidgetProps {
  stats: DashboardStats;
}

export function ImpactWidget({ stats }: ImpactWidgetProps) {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-charcoal-200 shadow-soft space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Recycle className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-charcoal-900">
              🌱 Your Verified ReVIBE Impact
            </h3>
          </div>
          <p className="text-xs text-charcoal-500 mt-1">Aggregated from verified upcycling, sales, and donation records</p>
        </div>

        <span className="px-3 py-1 rounded-full bg-sand-100 border border-sand-200 text-charcoal-600 text-[10px] font-bold self-start sm:self-auto">
          Illustrative Estimate
        </span>
      </div>

      {/* 4 Impact Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Waste Diverted */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100/80 space-y-1">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[10px] uppercase font-bold tracking-wider">Waste Diverted</span>
            <Recycle className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-emerald-950">
            {stats.wasteDivertedKg} <span className="text-xs font-normal text-emerald-700">kg</span>
          </div>
          <span className="text-[10px] text-emerald-800 font-medium block">
            {stats.itemsReused} total items rescued
          </span>
        </div>

        {/* 2. Water Saved */}
        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100/80 space-y-1">
          <div className="flex items-center justify-between text-sky-700">
            <span className="text-[10px] uppercase font-bold tracking-wider">Water Conserved</span>
            <Droplets className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-sky-950">
            {stats.waterSavedLiters} <span className="text-xs font-normal text-sky-700">liters</span>
          </div>
          <span className="text-[10px] text-sky-800 font-medium block">
            vs virgin raw material extraction
          </span>
        </div>

        {/* 3. CO2 Avoided */}
        <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100/80 space-y-1">
          <div className="flex items-center justify-between text-teal-700">
            <span className="text-[10px] uppercase font-bold tracking-wider">CO2 Emissions Avoided</span>
            <CloudFog className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-teal-950">
            {stats.co2SavedKg} <span className="text-xs font-normal text-teal-700">kg CO2e</span>
          </div>
          <span className="text-[10px] text-teal-800 font-medium block">
            Equivalent to {Math.round(stats.co2SavedKg * 4.5)} km driving
          </span>
        </div>

        {/* 4. Value Created */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100/80 space-y-1">
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-[10px] uppercase font-bold tracking-wider">Value Created</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black text-amber-950">
            ₹{stats.potentialValueCreatedInr.toLocaleString()}
          </div>
          <span className="text-[10px] text-amber-800 font-medium block">
            Across products & donations
          </span>
        </div>
      </div>

      {/* Conversion Footnote */}
      <div className="p-3.5 rounded-xl bg-charcoal-50 border border-charcoal-100 text-[11px] text-charcoal-600 flex items-start gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
        <span>
          Metrics are generated using standard life-cycle assessment (LCA) environmental conversion factors per kilogram of repurposed polymer, glass, cellulose, and textile fiber.
        </span>
      </div>
    </div>
  );
}
