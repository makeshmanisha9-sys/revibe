'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, TrendingUp, Percent, Package, RotateCcw } from 'lucide-react';

interface ProfitCalculatorProps {
  initialQuantity?: number;
  initialMaterialCost?: number;
  initialAdditionalCost?: number;
  initialSellingPrice?: number;
}

export function ProfitCalculator({
  initialQuantity = 10,
  initialMaterialCost = 40,
  initialAdditionalCost = 20,
  initialSellingPrice = 250,
}: ProfitCalculatorProps) {
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [materialCost, setMaterialCost] = useState<number>(initialMaterialCost);
  const [additionalCost, setAdditionalCost] = useState<number>(initialAdditionalCost);
  const [sellingPrice, setSellingPrice] = useState<number>(initialSellingPrice);

  const calculations = useMemo(() => {
    const q = Math.max(1, Number(quantity) || 1);
    const mCost = Math.max(0, Number(materialCost) || 0);
    const aCost = Math.max(0, Number(additionalCost) || 0);
    const price = Math.max(0, Number(sellingPrice) || 0);

    const costPerUnit = mCost + aCost;
    const totalCost = costPerUnit * q;
    const revenue = price * q;
    const profit = revenue - totalCost;
    const profitMargin = revenue > 0 ? Number(((profit / revenue) * 100).toFixed(1)) : 0;
    const profitPerUnit = price - costPerUnit;

    return {
      costPerUnit,
      totalCost,
      revenue,
      profit,
      profitMargin,
      profitPerUnit,
    };
  }, [quantity, materialCost, additionalCost, sellingPrice]);

  const handleReset = () => {
    setQuantity(initialQuantity);
    setMaterialCost(initialMaterialCost);
    setAdditionalCost(initialAdditionalCost);
    setSellingPrice(initialSellingPrice);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-charcoal-200 shadow-soft space-y-6">
      <div className="flex items-center justify-between border-b border-charcoal-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-100/80 text-emerald-800">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-charcoal-900">
              Interactive Profit & ROI Calculator
            </h3>
            <p className="text-xs text-charcoal-500">Live reactive unit economics formula</p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="p-2 rounded-xl text-charcoal-500 hover:text-charcoal-800 hover:bg-charcoal-100 text-xs font-semibold flex items-center gap-1 transition-colors btn-press"
          title="Reset to defaults"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Sliders & Fields */}
        <div className="space-y-4">
          {/* Quantity */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="font-bold text-charcoal-700">Production Batch Size (Units)</label>
              <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg">
                {quantity} units
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="500"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full h-2 bg-charcoal-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Raw Material Cost */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="font-bold text-charcoal-700">Raw Waste Material Cost (₹ / unit)</label>
              <span className="font-mono font-bold text-charcoal-900">₹{materialCost}</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={materialCost}
              onChange={(e) => setMaterialCost(Number(e.target.value))}
              className="w-full h-2 bg-charcoal-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Additional Tooling / Accessories Cost */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="font-bold text-charcoal-700">Additional Materials & Glue (₹ / unit)</label>
              <span className="font-mono font-bold text-charcoal-900">₹{additionalCost}</span>
            </div>
            <input
              type="range"
              min="0"
              max="300"
              value={additionalCost}
              onChange={(e) => setAdditionalCost(Number(e.target.value))}
              className="w-full h-2 bg-charcoal-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Target Selling Price */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label className="font-bold text-charcoal-700">Target Selling Price (₹ / unit)</label>
              <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg">
                ₹{sellingPrice}
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="2000"
              step="10"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              className="w-full h-2 bg-charcoal-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>
        </div>

        {/* Real-time Financial Output Cards */}
        <div className="flex flex-col justify-between p-5 rounded-2xl bg-charcoal-50/80 border border-charcoal-200 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-charcoal-600 pb-2 border-b border-charcoal-200/80">
              <span>Total Production Cost:</span>
              <span className="font-mono font-bold text-charcoal-900">
                (₹{calculations.costPerUnit} × {quantity}) = ₹{calculations.totalCost}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-charcoal-600 pb-2 border-b border-charcoal-200/80">
              <span>Gross Projected Revenue:</span>
              <span className="font-mono font-bold text-charcoal-900">
                (₹{sellingPrice} × {quantity}) = ₹{calculations.revenue}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-charcoal-600 pb-2 border-b border-charcoal-200/80">
              <span>Net Profit Per Unit:</span>
              <span className="font-mono font-bold text-emerald-800">
                +₹{calculations.profitPerUnit} / unit
              </span>
            </div>
          </div>

          {/* Large Result Box */}
          <div className="p-4 rounded-xl bg-emerald-800 text-white flex items-center justify-between shadow-soft">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-200 block">
                Total Net Profit ({quantity} units)
              </span>
              <div className="text-2xl sm:text-3xl font-black mt-0.5">
                ₹{calculations.profit.toLocaleString()}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-200 block">
                Profit Margin
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-300 flex items-center justify-end gap-0.5">
                <span>{calculations.profitMargin}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
