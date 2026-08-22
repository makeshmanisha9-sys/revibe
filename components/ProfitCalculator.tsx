'use client';

import React, { useState } from 'react';
import { Calculator, DollarSign, PieChart, TrendingUp, Layers } from 'lucide-react';

interface ProfitCalculatorProps {
  initialMaterialCost?: number;
  initialAdditionalCost?: number;
  initialSellingPrice?: number;
}

export const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({
  initialMaterialCost = 40,
  initialAdditionalCost = 40,
  initialSellingPrice = 300,
}) => {
  const [quantity, setQuantity] = useState<number>(10);
  const [materialCost, setMaterialCost] = useState<number>(initialMaterialCost);
  const [additionalCost, setAdditionalCost] = useState<number>(initialAdditionalCost);
  const [sellingPrice, setSellingPrice] = useState<number>(initialSellingPrice);

  // Dynamic real-time calculations
  const unitCost = Math.max(0, materialCost + additionalCost);
  const totalCost = unitCost * quantity;
  const revenue = Math.max(0, sellingPrice * quantity);
  const profit = revenue - totalCost;
  const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;

  return (
    <div className="rounded-2xl bg-emerald-950/80 border border-emerald-800 p-6 space-y-6 shadow-xl">
      <div className="flex items-center gap-2 border-b border-emerald-800/80 pb-4">
        <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Interactive Profit Calculator</h3>
          <p className="text-xs text-emerald-300/70">Real-time financial feasibility modeling</p>
        </div>
      </div>

      {/* Input Sliders & Number Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-1.5 p-3 rounded-xl bg-emerald-900/40 border border-emerald-800/60">
          <label className="text-xs font-semibold text-emerald-200">Quantity (Units)</label>
          <input
            type="number"
            min="1"
            max="1000"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full bg-emerald-950 border border-emerald-700/80 rounded-lg px-3 py-1.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="space-y-1.5 p-3 rounded-xl bg-emerald-900/40 border border-emerald-800/60">
          <label className="text-xs font-semibold text-emerald-200">Material Cost (₹/unit)</label>
          <input
            type="number"
            min="0"
            value={materialCost}
            onChange={(e) => setMaterialCost(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full bg-emerald-950 border border-emerald-700/80 rounded-lg px-3 py-1.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="space-y-1.5 p-3 rounded-xl bg-emerald-900/40 border border-emerald-800/60">
          <label className="text-xs font-semibold text-emerald-200">Additional Cost (₹/unit)</label>
          <input
            type="number"
            min="0"
            value={additionalCost}
            onChange={(e) => setAdditionalCost(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full bg-emerald-950 border border-emerald-700/80 rounded-lg px-3 py-1.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="space-y-1.5 p-3 rounded-xl bg-emerald-900/40 border border-emerald-800/60">
          <label className="text-xs font-semibold text-emerald-200">Selling Price (₹/unit)</label>
          <input
            type="number"
            min="0"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full bg-emerald-950 border border-emerald-700/80 rounded-lg px-3 py-1.5 text-sm font-bold text-white focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Dynamic Results Display */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>Total Production Cost</span>
          </div>
          <p className="text-xl font-black text-white">₹{totalCost.toLocaleString()}</p>
          <p className="text-[10px] text-slate-400">(₹{unitCost}/unit × {quantity})</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold">
            <DollarSign className="w-3.5 h-3.5 text-blue-400" />
            <span>Total Revenue</span>
          </div>
          <p className="text-xl font-black text-blue-300">₹{revenue.toLocaleString()}</p>
          <p className="text-[10px] text-slate-400">(₹{sellingPrice}/unit × {quantity})</p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-700/60 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Estimated Profit</span>
          </div>
          <p className={`text-xl font-black ${profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            ₹{profit.toLocaleString()}
          </p>
          <p className="text-[10px] text-emerald-300/70">(Revenue - Total Cost)</p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-700/60 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-semibold">
            <PieChart className="w-3.5 h-3.5 text-emerald-400" />
            <span>Profit Margin</span>
          </div>
          <p className={`text-xl font-black ${profitMargin >= 0 ? 'text-emerald-300' : 'text-red-400'}`}>
            {profitMargin.toFixed(1)}%
          </p>
          <p className="text-[10px] text-emerald-300/70">(Profit / Revenue × 100)</p>
        </div>
      </div>
    </div>
  );
};
