'use client';

import React from 'react';
import { BusinessAnalysisResult } from '@/types/database';
import { TrendingUp, DollarSign, Users, Briefcase, Percent, ShieldCheck, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface BusinessAnalysisCardProps {
  business: BusinessAnalysisResult;
}

export function BusinessAnalysisCard({ business }: BusinessAnalysisCardProps) {
  const totalCost = business.production_cost + business.additional_cost;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-charcoal-200 shadow-soft space-y-6">
      <div className="flex items-center justify-between border-b border-charcoal-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-100/80 text-emerald-800">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-charcoal-900">
              Commercial Viability & Profit Breakdown
            </h3>
            <p className="text-xs text-charcoal-500">Economic Unit Analysis & Margin Projections</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{business.market_demand} Market Demand</span>
        </span>
      </div>

      {/* 4-Box Key Financial Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-charcoal-50 border border-charcoal-100">
          <span className="text-[10px] uppercase font-bold text-charcoal-400 tracking-wider block">Production Cost</span>
          <div className="text-lg font-black text-charcoal-900 mt-1">₹{business.production_cost}</div>
          <span className="text-[10px] text-charcoal-500 mt-0.5 block">+ ₹{business.additional_cost} aux. tooling</span>
        </div>

        <div className="p-4 rounded-2xl bg-charcoal-50 border border-charcoal-100">
          <span className="text-[10px] uppercase font-bold text-charcoal-400 tracking-wider block">Suggested Price</span>
          <div className="text-lg font-black text-charcoal-900 mt-1">₹{business.suggested_selling_price}</div>
          <span className="text-[10px] text-charcoal-500 mt-0.5 block">Market competitive</span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100">
          <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">Est. Profit / Unit</span>
          <div className="text-lg font-black text-emerald-900 mt-1">₹{business.estimated_profit}</div>
          <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 block">Net pre-tax margin</span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100">
          <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">Profit Margin</span>
          <div className="text-lg font-black text-emerald-900 mt-1 flex items-center gap-1">
            <Percent className="w-4 h-4 text-emerald-600" />
            <span>{business.profit_margin}%</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 block">High ROI potential</span>
        </div>
      </div>

      {/* Target Buyer Personas */}
      <div className="p-5 rounded-2xl bg-charcoal-50/60 border border-charcoal-100 space-y-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-charcoal-700" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
            Target Customer Demographics
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {business.potential_buyers.map((buyer, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-charcoal-200 text-xs text-charcoal-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0" />
              <span className="font-semibold">{buyer}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Listing Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-900 to-charcoal-900 text-white">
        <div className="space-y-0.5 text-center sm:text-left">
          <h4 className="text-xs font-bold text-emerald-300">Ready to commercialize this product?</h4>
          <p className="text-[11px] text-charcoal-300">List directly in ReVIBE Marketplace and accept customer requests.</p>
        </div>
        <Link
          href={`/sell?price=${business.suggested_selling_price}&cost=${totalCost}`}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-xs font-bold flex items-center gap-1.5 btn-press flex-shrink-0"
        >
          <span>List Product Now</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
