'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Idea } from '@/types/database';
import { Clock, Wrench, PackageCheck, ListOrdered, ShoppingBag, Bookmark, Check, Youtube, ExternalLink } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface IdeaCardProps {
  idea: Idea;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const { showToast } = useToast();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(!saved);
    showToast(saved ? 'Idea removed from saved list' : 'Idea saved to your profile!', 'success');
  };

  const difficultyColors = {
    Easy: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    Medium: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    Hard: 'bg-red-500/20 text-red-300 border-red-500/40',
  };

  // Generate dynamic YouTube search tutorial link if not explicitly set
  const videoSearchQuery = idea.tutorial_url || `https://www.youtube.com/results?search_query=${encodeURIComponent('How to make ' + idea.product_name + ' DIY upcycling tutorial')}`;

  return (
    <div className="rounded-2xl bg-emerald-950/60 border border-emerald-800/80 p-6 space-y-6 hover:border-emerald-500/50 transition-all shadow-lg">
      <div className="flex items-start justify-between gap-4 border-b border-emerald-800/60 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full border ${difficultyColors[idea.difficulty]}`}>
              {idea.difficulty}
            </span>
            <span className="flex items-center gap-1 text-xs text-emerald-300/80">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              {idea.estimated_time}
            </span>
          </div>
          <h4 className="text-lg font-extrabold text-white">{idea.product_name}</h4>
          <p className="text-xs text-emerald-200/70 mt-1">{idea.description}</p>
        </div>

        <button
          onClick={handleSave}
          className={`p-2.5 rounded-xl border transition-all ${
            saved ? 'bg-emerald-500 text-emerald-950 border-emerald-400' : 'bg-emerald-900/40 border-emerald-700 text-emerald-300 hover:bg-emerald-800'
          }`}
        >
          {saved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>
      </div>

      {/* Materials & Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-3.5 rounded-xl bg-emerald-900/30 border border-emerald-800/60 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-emerald-300">
            <PackageCheck className="w-4 h-4 text-emerald-400" />
            <span>Materials Required</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-emerald-200/80">
            {idea.materials.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-900/30 border border-emerald-800/60 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-emerald-300">
            <Wrench className="w-4 h-4 text-emerald-400" />
            <span>Tools Required</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-emerald-200/80">
            {idea.tools.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Step-by-Step Instructions */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-200">
            <ListOrdered className="w-4 h-4 text-emerald-400" />
            <span>Step-by-Step Assembly Instructions</span>
          </div>
        </div>
        <ol className="space-y-2 text-xs">
          {idea.instructions.map((step, idx) => (
            <li key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-emerald-900/20 border border-emerald-800/40 text-emerald-100">
              <span className="font-bold text-emerald-400">{idx + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* YouTube Video Tutorial Recommendation Banner */}
      <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-900/60 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-red-600 text-white">
            <Youtube className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-white">YouTube DIY Video Tutorial</p>
            <p className="text-[10px] text-red-200/70">Watch step-by-step visual craft guide</p>
          </div>
        </div>
        <a
          href={videoSearchQuery}
          target="_blank"
          rel="noreferrer"
          className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-600/20 transition-all"
        >
          <span>Watch Tutorial</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-emerald-800/60 flex items-center justify-between gap-3">
        <div className="text-xs">
          <span className="text-emerald-400 font-bold">Suggested Value:</span>
          <span className="ml-1 text-white font-extrabold">₹{idea.selling_price}</span>
        </div>
        <Link
          href={`/sell?name=${encodeURIComponent(idea.product_name)}&material=${encodeURIComponent(idea.materials.join(', '))}&price=${idea.selling_price}&cost=${idea.cost}`}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>List in Marketplace</span>
        </Link>
      </div>
    </div>
  );
};
