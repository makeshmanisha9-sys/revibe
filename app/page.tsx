import React from 'react';
import { Hero } from '@/components/Hero';
import { FeatureCards } from '@/components/FeatureCards';
import { HowItWorks } from '@/components/HowItWorks';
import Link from 'next/link';
import { Sparkles, ShoppingBag, ArrowRight, ShieldCheck, Recycle, Trophy, Gift, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* 1. Hero Section with Interactive Waste Flow */}
      <Hero />

      {/* 2. Primary Ecosystem Feature Cards */}
      <FeatureCards />

      {/* 3. 8-Step Animated Process: How It Works */}
      <HowItWorks />

      {/* 4. Hackathon Highlights: Mission & Global Circular Impact */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-emerald-900 via-charcoal-900 to-charcoal-950 text-white shadow-soft-lg flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <Recycle className="w-4 h-4 text-emerald-400" />
                <span>Zero Landfill Mission</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Ready to transform your discarded materials into high-value assets?
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-300 leading-relaxed font-normal">
                Join thousands of creators, households, students, and green entrepreneurs turning municipal and household waste into verified income and environmental impact.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto flex-shrink-0">
              <Link
                href="/upload"
                className="py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-xs sm:text-sm font-black text-center transition-all btn-press shadow-soft flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Start AI Analysis</span>
              </Link>
              <Link
                href="/challenges"
                className="py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold text-center transition-all btn-press flex items-center justify-center gap-2"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Try 60-Min Challenge</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
