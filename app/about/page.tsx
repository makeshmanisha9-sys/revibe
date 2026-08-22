import React from 'react';
import { Recycle, ShieldCheck, Globe, Lightbulb, Target } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase">
          <Globe className="w-4 h-4 text-emerald-400" />
          <span>The ReVIBE Sustainability Mission</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
          Recycle Waste. Create Value. Inspire Change.
        </h1>

        <p className="text-base text-emerald-200/80 leading-relaxed">
          ReVIBE is an AI-powered sustainability platform bridging computer vision, DIY creative upcycling, micro-business financial calculations, and community circular sharing.
        </p>
      </div>

      {/* Problem & Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-emerald-950/80 border border-emerald-800 space-y-4 shadow-xl">
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 w-12 h-12 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">The Problem</h2>
          <p className="text-xs text-emerald-200/80 leading-relaxed">
            Over 2 billion tons of municipal solid waste are generated globally each year. Vast amounts of reusable plastic, cardboard, glass, coconut shells, and denim scrap are discarded daily because individuals lack immediate knowledge on how to transform them into value.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-emerald-950/80 border border-emerald-800 space-y-4 shadow-xl">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-12 h-12 flex items-center justify-center">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Our Solution</h2>
          <p className="text-xs text-emerald-200/80 leading-relaxed">
            ReVIBE uses Google Gemini Multimodal AI to instantly identify waste materials from a single photo, providing tailored step-by-step DIY upcycling guides, calculating commercial profit margins, and offering a circular marketplace & donation hub.
          </p>
        </div>
      </div>

      {/* Sustainable Impact Stats */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-950 to-emerald-900 border border-emerald-700/60 text-center space-y-6">
        <h2 className="text-2xl font-black text-white">Our Circular Impact Blueprint</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-emerald-100">
          <div className="space-y-1">
            <p className="text-3xl font-black text-emerald-400">2.01B Tons</p>
            <p className="text-xs text-emerald-300/70">Annual Global Waste Generated</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-emerald-300">73% Margin</p>
            <p className="text-xs text-emerald-300/70">Avg Upcycled Product Yield</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-black text-emerald-400">100% Verified</p>
            <p className="text-xs text-emerald-300/70">Database-Driven Tracking</p>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
          >
            <Recycle className="w-4 h-4" />
            <span>Try AI Waste Scan Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
