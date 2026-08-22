'use client';

import React from 'react';
import { BusinessAnalysisResult } from '@/types/database';
import { DollarSign, TrendingUp, PieChart, Users, AlertCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface BusinessAnalysisCardProps {
  business: BusinessAnalysisResult;
}

export const BusinessAnalysisCard: React.FC<BusinessAnalysisCardProps> = ({ business }) => {
  return (
    <div className="rounded-2xl bg-gradient-to-b from-emerald-950 to-slate-950 border border-emerald-700/60 p-6 space-y-6 shadow-2xl">
      <div className="flex items-center justify-between border-b border-emerald-800/80 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Commercial Feasibility Metrics</h3>
            <p className="text-xs text-emerald-300/70">AI Micro-Business Valuation</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold uppercase">
          Demand: {business.market_demand}
        </span>
      </div>

      {/* Financial Matrix Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-800/60 space-y-1">
          <span className="text-emerald-400 font-semibold">Total Prod. Cost</span>
          <p className="text-xl font-black text-white">₹{business.production_cost + business.additional_cost}</p>
          <p className="text-[10px] text-emerald-300/60">(Mat: ₹{business.production_cost} + Add: ₹{business.additional_cost})</p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-800/60 space-y-1">
          <span className="text-blue-400 font-semibold">Suggested Selling Price</span>
          <p className="text-xl font-black text-blue-300">₹{business.suggested_selling_price}</p>
          <p className="text-[10px] text-emerald-300/60">Based on market demand</p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-800/60 space-y-1">
          <span className="text-emerald-400 font-semibold">Estimated Net Profit</span>
          <p className="text-xl font-black text-emerald-400">₹{business.estimated_profit}</p>
          <p className="text-[10px] text-emerald-300/60">Per unit profit</p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-800/60 space-y-1">
          <span className="text-emerald-300 font-semibold">Profit Margin</span>
          <p className="text-xl font-black text-emerald-300">{business.profit_margin.toFixed(1)}%</p>
          <p className="text-[10px] text-emerald-300/60">High yield margin</p>
        </div>
      </div>

      {/* Target Buyer Personas */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-200">
          <Users className="w-4 h-4 text-emerald-400" />
          <span>Potential Target Buyers & Market Segment</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {business.potential_buyers.map((buyer, idx) => (
            <span key={idx} className="px-3 py-1 rounded-lg bg-emerald-900/50 border border-emerald-700/50 text-xs text-emerald-200 font-medium">
              🎯 {buyer}
            </span>
          ))}
        </div>
      </div>

      {/* Recommended Scalable Products */}
      {business.product_ideas && business.product_ideas.length > 0 && (
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Scalable Product Opportunity:</h4>
          {business.product_ideas.map((prod, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-sm text-white">{prod.product_name}</p>
                <p className="text-xs text-emerald-200/70 mt-0.5">{prod.description}</p>
              </div>
              <Link
                href={`/sell?name=${encodeURIComponent(prod.product_name)}&price=${prod.selling_price}&cost=${prod.cost}`}
                className="px-4 py-2 rounded-lg bg-emerald-500 text-emerald-950 font-bold text-xs flex items-center gap-1 hover:bg-emerald-400 transition-colors shadow-md"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Launch This Product</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
