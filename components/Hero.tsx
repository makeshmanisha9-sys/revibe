'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag, ArrowRight, Recycle, Leaf, TrendingUp } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white pt-16 pb-24 border-b border-emerald-800/40">
      {/* Background Subtle Glow & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI-Powered Sustainability Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Turn Waste Into <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">Worth.</span>
            </h1>

            <p className="text-base sm:text-lg text-emerald-100/80 max-w-2xl leading-relaxed">
              AI-powered ideas that transform reusable waste into products, opportunities, and impact.
              Identify discarded items, generate DIY upcycling tutorials, calculate profit margins, and launch green micro-businesses.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/upload"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 group"
              >
                <Sparkles className="w-4 h-4" />
                <span>Analyze My Waste</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/marketplace"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-100 font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                <span>Explore Marketplace</span>
              </Link>
            </div>

            {/* Live Platform Proof Badges */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-emerald-800/40 text-center sm:text-left">
              <div>
                <p className="text-2xl font-black text-white">95%+</p>
                <p className="text-xs text-emerald-300/70">AI Material Precision</p>
              </div>
              <div>
                <p className="text-2xl font-black text-emerald-400">₹0 Trash</p>
                <p className="text-xs text-emerald-300/70">Circular Business</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">100% Real</p>
                <p className="text-xs text-emerald-300/70">Supabase Persistent Data</p>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl bg-gradient-to-b from-emerald-900/90 to-emerald-950 p-6 border border-emerald-700/50 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Recycle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Live Waste Transformation</h3>
                    <p className="text-xs text-emerald-300/70">AI Multimodal Scan</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase">
                  Active
                </span>
              </div>

              {/* Card Image Showcase */}
              <div className="relative rounded-xl overflow-hidden aspect-video border border-emerald-700/60 group">
                <img
                  src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
                  alt="Upcycled Plastic Bottle Lamp"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="bg-emerald-900/90 border border-emerald-700 text-emerald-200 px-2.5 py-1 rounded-md font-semibold">
                    Detected: Plastic HDPE Bottle
                  </span>
                  <span className="bg-emerald-500 text-emerald-950 font-bold px-2 py-1 rounded-md">
                    73% Profit Margin
                  </span>
                </div>
              </div>

              {/* Interactive Mini Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-800/60">
                  <div className="flex items-center gap-1.5 text-emerald-400 mb-1 font-semibold">
                    <Leaf className="w-4 h-4" />
                    <span>Creative Mode</span>
                  </div>
                  <p className="text-emerald-200 font-bold">Ambient Light Lamp</p>
                  <p className="text-[10px] text-emerald-400/70">DIY 1.5 hrs tutorial</p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-800/60">
                  <div className="flex items-center gap-1.5 text-emerald-400 mb-1 font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    <span>Business Mode</span>
                  </div>
                  <p className="text-emerald-200 font-bold">Est. Profit: ₹220</p>
                  <p className="text-[10px] text-emerald-400/70">High Demand Market</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
