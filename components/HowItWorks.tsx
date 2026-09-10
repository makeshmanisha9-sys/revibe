'use client';

import React from 'react';
import { UploadCloud, Sparkles, Dna, Palette, Hammer, ShoppingBag, Trophy, Flame } from 'lucide-react';

const STEPS = [
  { step: '01', title: 'Upload Waste', desc: 'Capture or drag a photo of discarded materials.', icon: UploadCloud },
  { step: '02', title: 'AI Identification', desc: 'Multimodal vision classifies material category & purity.', icon: Sparkles },
  { step: '03', title: 'Explore Waste DNA', desc: 'Inspect transformation potential and rescue score.', icon: Dna },
  { step: '04', title: 'Choose Mode', desc: 'Switch between Creative DIY and Business Mode.', icon: Palette },
  { step: '05', title: 'Generate Ideas', desc: 'Receive step-by-step blueprints & YouTube tutorials.', icon: Hammer },
  { step: '06', title: 'Learn & Create', desc: 'Craft high-value products with safety guidance.', icon: Trophy },
  { step: '07', title: 'Sell or Donate', desc: 'List in Marketplace, donate scrap, or share to Community.', icon: ShoppingBag },
  { step: '08', title: 'Earn Eco Score', desc: 'Earn verified points, unlock badges, and track impact.', icon: Flame },
];

export function HowItWorks() {
  return (
    <section className="py-12 lg:py-16 bg-charcoal-50/70 border-y border-charcoal-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 block">
            The Circular Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-charcoal-900">
            How ReVIBE Works
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500">
            An intuitive 8-step journey from landfill avoidance to tangible economic value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white border border-charcoal-200 shadow-soft flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">
                    {s.step}
                  </span>
                  <Icon className="w-5 h-5 text-charcoal-400" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-charcoal-900">{s.title}</h4>
                  <p className="text-xs text-charcoal-500 mt-1 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
