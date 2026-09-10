'use client';

import React from 'react';
import { WasteRescueScore } from '@/types/database';
import { Award, ShieldAlert, Sparkles, CheckCircle2, Recycle, Compass, Hammer, Leaf } from 'lucide-react';

interface WasteRescueScoreCardProps {
  rescueScore: WasteRescueScore;
}

export function WasteRescueScoreCard({ rescueScore }: WasteRescueScoreCardProps) {
  const { score, level, tagline, criteria } = rescueScore;

  const getScoreColor = () => {
    if (score >= 85) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 70) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-charcoal-700 bg-charcoal-50 border-charcoal-200';
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-charcoal-200 shadow-soft space-y-6">
      <div className="flex items-center justify-between border-b border-charcoal-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-100/80 text-emerald-800">
            <Recycle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-charcoal-900">
              ♻️ Waste Rescue Score
            </h3>
            <p className="text-xs text-charcoal-500">Deterministic Upcycling Suitability Index</p>
          </div>
        </div>

        <div className={`px-3 py-1 rounded-2xl border font-black text-sm ${getScoreColor()}`}>
          {score} <span className="text-[10px] font-normal text-charcoal-500">/ 100</span>
        </div>
      </div>

      {/* Main Score Hero */}
      <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-charcoal-50/70 border border-charcoal-100">
        <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-charcoal-200"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-emerald-600 transition-all duration-1000 ease-out"
              strokeDasharray={`${score}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-lg font-black text-charcoal-900">{score}</span>
          </div>
        </div>

        <div className="space-y-1 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wide">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            <span>{level}</span>
          </span>
          <p className="text-xs text-charcoal-600 font-medium leading-relaxed mt-1">
            {tagline}
          </p>
        </div>
      </div>

      {/* Criteria Breakdown Progress Bars */}
      <div className="space-y-3 pt-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block">
          Deterministic Scoring Breakdown
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* 1. Recyclability */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-charcoal-700 flex items-center gap-1.5">
                <Recycle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Material Purity</span>
              </span>
              <span className="font-mono font-bold text-charcoal-800">{criteria.recyclability}/25</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-charcoal-100 overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full"
                style={{ width: `${(criteria.recyclability / 25) * 100}%` }}
              />
            </div>
          </div>

          {/* 2. Structural Integrity */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-charcoal-700 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-sky-600" />
                <span>Structural Rigidity</span>
              </span>
              <span className="font-mono font-bold text-charcoal-800">{criteria.structuralIntegrity}/25</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-charcoal-100 overflow-hidden">
              <div
                className="h-full bg-sky-600 rounded-full"
                style={{ width: `${(criteria.structuralIntegrity / 25) * 100}%` }}
              />
            </div>
          </div>

          {/* 3. Processing Ease */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-charcoal-700 flex items-center gap-1.5">
                <Hammer className="w-3.5 h-3.5 text-amber-600" />
                <span>DIY Fabrication Ease</span>
              </span>
              <span className="font-mono font-bold text-charcoal-800">{criteria.processingEase}/25</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-charcoal-100 overflow-hidden">
              <div
                className="h-full bg-amber-600 rounded-full"
                style={{ width: `${(criteria.processingEase / 25) * 100}%` }}
              />
            </div>
          </div>

          {/* 4. Environmental Benefit */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-charcoal-700 flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>CO2 & Landfill Savings</span>
              </span>
              <span className="font-mono font-bold text-charcoal-800">{criteria.environmentalBenefit}/25</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-charcoal-100 overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full"
                style={{ width: `${(criteria.environmentalBenefit / 25) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
