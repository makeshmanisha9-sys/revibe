'use client';

import React from 'react';
import { AIWasteAnalysisResponse } from '@/services/ai/wasteAnalysis';
import { Sparkles, Palette, TrendingUp, CheckCircle2, ShieldCheck } from 'lucide-react';

interface AIAnalysisCardProps {
  analysis: AIWasteAnalysisResponse;
  activeMode: 'creative' | 'business';
  onModeChange: (mode: 'creative' | 'business') => void;
}

export const AIAnalysisCard: React.FC<AIAnalysisCardProps> = ({
  analysis,
  activeMode,
  onModeChange,
}) => {
  return (
    <div className="rounded-2xl bg-gradient-to-b from-emerald-900/60 to-emerald-950 border border-emerald-700/60 p-6 space-y-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-emerald-800/80 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">AI Detection Results</h3>
            <p className="text-xs text-emerald-300/70">Verified Material Identification</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Confidence: {analysis.confidence}%</span>
        </div>
      </div>

      {/* Material & Category Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800/60 space-y-1">
          <span className="text-[10px] uppercase font-bold text-emerald-400">Material Detected</span>
          <p className="text-lg font-extrabold text-white">{analysis.detectedMaterial}</p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800/60 space-y-1">
          <span className="text-[10px] uppercase font-bold text-emerald-400">Waste Category</span>
          <p className="text-lg font-extrabold text-emerald-300">{analysis.wasteCategory}</p>
        </div>
      </div>

      {/* Extracted Sub-materials */}
      {analysis.possibleReusableMaterials && analysis.possibleReusableMaterials.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-semibold text-emerald-200">Possible Reusable Components:</span>
          <div className="flex flex-wrap gap-2">
            {analysis.possibleReusableMaterials.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-900/60 border border-emerald-700/50 text-xs text-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Mode Selector Toggle Buttons */}
      <div className="pt-4 border-t border-emerald-800/80">
        <label className="block text-xs font-bold text-emerald-200 uppercase mb-3">
          Select Transformation Mode:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onModeChange('creative')}
            className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
              activeMode === 'creative'
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-emerald-950/60 border-emerald-800/80 text-emerald-200/80 hover:bg-emerald-900/40 hover:text-white'
            }`}
          >
            <div className={`p-2 rounded-lg ${activeMode === 'creative' ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-400'}`}>
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-sm">🎨 Creative Mode</p>
              <p className="text-xs opacity-80 mt-0.5">Art, home decor, DIY projects, and step-by-step assembly tutorials.</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onModeChange('business')}
            className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
              activeMode === 'business'
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-emerald-950/60 border-emerald-800/80 text-emerald-200/80 hover:bg-emerald-900/40 hover:text-white'
            }`}
          >
            <div className={`p-2 rounded-lg ${activeMode === 'business' ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-400'}`}>
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-sm">💰 Business Mode</p>
              <p className="text-xs opacity-80 mt-0.5">Production costs, selling prices, profit margins, and buyer demand analysis.</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
