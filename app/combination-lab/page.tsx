'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { generateCombinationIdeas } from '@/services/ai/combinationLab';
import { CombinationLabResult } from '@/types/database';
import { TutorialSection } from '@/components/TutorialSection';
import {
  Layers,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Hammer,
  Clock,
  DollarSign,
  Percent,
  RefreshCw,
  ShoppingBag,
} from 'lucide-react';
import Link from 'next/link';

const AVAILABLE_MATERIALS = [
  'Plastic Bottle',
  'Corrugated Cardboard',
  'Old Newspaper',
  'Waste Fabric / Denim',
  'Glass Bottle / Jar',
  'Coconut Shell',
  'Aluminum Can',
  'Egg Cartons',
  'Discarded Wood Scraps',
  'Jute Sacks / Twine',
];

export default function CombinationLabPage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([
    'Plastic Bottle',
    'Corrugated Cardboard',
    'Old Newspaper',
    'Waste Fabric / Denim',
  ]);
  const [customMaterial, setCustomMaterial] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<CombinationLabResult | null>(null);

  const handleAddMaterial = (mat: string) => {
    if (!selectedMaterials.includes(mat)) {
      setSelectedMaterials([...selectedMaterials, mat]);
    }
  };

  const handleRemoveMaterial = (mat: string) => {
    setSelectedMaterials(selectedMaterials.filter((m) => m !== mat));
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMaterial.trim()) return;
    if (!selectedMaterials.includes(customMaterial.trim())) {
      setSelectedMaterials([...selectedMaterials, customMaterial.trim()]);
      setCustomMaterial('');
    }
  };

  const handleSynthesize = async () => {
    if (selectedMaterials.length < 2) {
      showToast('Please select at least 2 materials to combine', 'error');
      return;
    }

    setIsGenerating(true);
    showToast('Synthesizing multi-material upcycling blueprint...', 'info');

    try {
      const data = await generateCombinationIdeas(selectedMaterials);
      setResult(data);
      showToast('Combination Blueprint Generated! 🧪', 'success');
    } catch (e) {
      showToast('Failed to synthesize combination', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
          <Layers className="w-4 h-4 text-teal-600" />
          <span>Multi-Material Synergy Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-charcoal-900">
          🧪 Waste Combination Lab
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500">
          Combine disparate waste materials (e.g. Plastic Bottle + Cardboard + Newspaper + Fabric) to generate unified, structurally sound, high-value creations.
        </p>
      </div>

      {/* Material Selection Grid */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-charcoal-200 shadow-soft space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between border-b border-charcoal-100 pb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
            Selected Waste Stream Inputs ({selectedMaterials.length})
          </h3>
          <span className="text-[11px] text-charcoal-400">Add or remove components</span>
        </div>

        {/* Selected Chips */}
        <div className="flex flex-wrap gap-2">
          {selectedMaterials.map((mat) => (
            <span
              key={mat}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 shadow-xs"
            >
              <span>♻️ {mat}</span>
              <button
                onClick={() => handleRemoveMaterial(mat)}
                className="p-0.5 rounded-full hover:bg-emerald-200/80 text-emerald-700 transition-colors"
                title="Remove"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>

        {/* Available Chips to Add */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 block">
            Add Discarded Materials
          </span>
          <div className="flex flex-wrap gap-1.5">
            {AVAILABLE_MATERIALS.filter((m) => !selectedMaterials.includes(m)).map((mat) => (
              <button
                key={mat}
                onClick={() => handleAddMaterial(mat)}
                className="px-3 py-1 rounded-xl bg-charcoal-50 hover:bg-charcoal-100 border border-charcoal-200 text-xs font-semibold text-charcoal-700 transition-colors flex items-center gap-1 btn-press"
              >
                <Plus className="w-3 h-3 text-emerald-600" />
                <span>{mat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Material Input Form */}
        <form onSubmit={handleAddCustom} className="flex gap-2">
          <input
            type="text"
            placeholder="Add custom waste material (e.g. Broken Ceramic Tiles)..."
            value={customMaterial}
            onChange={(e) => setCustomMaterial(e.target.value)}
            className="flex-1 px-3.5 py-2 rounded-xl bg-charcoal-50 border border-charcoal-200 text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
          />
          <button
            type="submit"
            disabled={!customMaterial.trim()}
            className="px-4 py-2 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 disabled:opacity-40 text-white text-xs font-bold btn-press"
          >
            Add Material
          </button>
        </form>

        {/* Synthesize Button */}
        <div className="pt-2 text-center">
          <button
            onClick={handleSynthesize}
            disabled={selectedMaterials.length < 2 || isGenerating}
            className="w-full sm:w-auto min-w-[260px] py-3.5 px-8 rounded-2xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-black text-sm shadow-soft transition-all btn-press inline-flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analyzing Material Synergy...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-teal-300" />
                <span>Synthesize Combination Blueprint</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Result Display */}
      {result && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-charcoal-200 shadow-soft-lg space-y-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-100 pb-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-extrabold uppercase tracking-wide">
                Synergy Score: {result.synergyScore}/100
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal-900 mt-2">
                {result.productName}
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1 leading-relaxed">
                {result.tagline}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 text-right flex-shrink-0">
              <span className="text-[10px] uppercase font-bold text-teal-800 tracking-wider block">Projected Profit</span>
              <div className="text-2xl font-black text-teal-950">₹{result.estimatedProfit}</div>
              <span className="text-[10px] font-bold text-teal-700">{result.profitMargin}% margin</span>
            </div>
          </div>

          {/* Parts Allocation Matrix */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 flex items-center gap-1.5">
              <span>🔬 Multi-Material Parts Mapping</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {result.partsMapping.map((part, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-charcoal-50 border border-charcoal-100 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-800">
                      ♻️ {part.wasteMaterial}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-charcoal-400">Sub-Part 0{idx + 1}</span>
                  </div>
                  <h4 className="text-xs font-bold text-charcoal-900">
                    {part.function}
                  </h4>
                  <p className="text-[11px] text-charcoal-500 leading-snug">
                    {part.preparationNote}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Step by Step Guide */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 flex items-center gap-1.5">
              <Hammer className="w-4 h-4 text-teal-600" />
              <span>Step-by-Step Synthesis Instructions</span>
            </h3>

            <div className="space-y-2.5">
              {result.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs text-charcoal-800 bg-charcoal-50/60 p-3 rounded-2xl border border-charcoal-100">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs font-black flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Tutorials */}
          {result.tutorials && result.tutorials.length > 0 && (
            <div className="pt-2">
              <TutorialSection tutorials={result.tutorials} productName={result.productName} />
            </div>
          )}

          {/* Commercial CTA */}
          <div className="p-4 rounded-2xl bg-charcoal-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <h4 className="text-xs font-bold text-teal-300">Ready to commercialize this multi-material creation?</h4>
              <p className="text-[11px] text-charcoal-300">List it in the Marketplace with the suggested pricing.</p>
            </div>
            <Link
              href={`/sell?name=${encodeURIComponent(result.productName)}&material=${encodeURIComponent(selectedMaterials.join(', '))}&cost=${result.estimatedCost}&price=${result.suggestedSellingPrice}`}
              className="py-2.5 px-5 rounded-xl bg-teal-500 hover:bg-teal-400 text-teal-950 font-black text-xs btn-press shadow-soft flex items-center gap-1.5 flex-shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>List Product</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
