'use client';

import React from 'react';
import { AIWasteAnalysisResponse } from '@/services/ai/wasteAnalysis';
import { WasteDNACard } from '@/components/WasteDNACard';
import { WasteRescueScoreCard } from '@/components/WasteRescueScoreCard';
import { Sparkles, Palette, Briefcase, CheckCircle2, Layers, ShieldCheck, Tag } from 'lucide-react';

interface AIAnalysisCardProps {
  analysis: AIWasteAnalysisResponse;
  activeMode: 'creative' | 'business';
  onModeChange: (mode: 'creative' | 'business') => void;
}

export function AIAnalysisCard({ analysis, activeMode, onModeChange }: AIAnalysisCardProps) {
  return (
    <div className="space-y-6">
      {/* Top Banner: Detection & Confidence */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-charcoal-200 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-charcoal-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 block">
                Multimodal AI Classification
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-charcoal-900">
                {analysis.detectedMaterial}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3 py-1 rounded-full bg-charcoal-100 text-charcoal-800 text-xs font-bold">
              {analysis.wasteCategory}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{analysis.confidence}% Confidence</span>
            </span>
          </div>
        </div>

        {/* Sub-materials extracted */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-500 block">
            Identified Reusable Sub-Components
          </span>
          <div className="flex flex-wrap gap-2">
            {analysis.possibleReusableMaterials?.map((sub, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-charcoal-50 border border-charcoal-200 text-xs font-semibold text-charcoal-800 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{sub}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Dual Cards: Waste DNA and Waste Rescue Score */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WasteDNACard dna={analysis.wasteDNA} />
        <WasteRescueScoreCard rescueScore={analysis.rescueScore} />
      </div>

      {/* Mode Switcher: Creative vs Business */}
      <div className="p-3 rounded-2xl bg-charcoal-100 border border-charcoal-200 flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => onModeChange('creative')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all duration-150 flex items-center justify-center gap-2 btn-press ${
            activeMode === 'creative'
              ? 'bg-emerald-700 text-white shadow-soft'
              : 'text-charcoal-700 hover:text-charcoal-900 hover:bg-white/60'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>🎨 Creative DIY Mode</span>
        </button>

        <button
          onClick={() => onModeChange('business')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition-all duration-150 flex items-center justify-center gap-2 btn-press ${
            activeMode === 'business'
              ? 'bg-emerald-700 text-white shadow-soft'
              : 'text-charcoal-700 hover:text-charcoal-900 hover:bg-white/60'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>💰 Business Opportunity Mode</span>
        </button>
      </div>
    </div>
  );
}
