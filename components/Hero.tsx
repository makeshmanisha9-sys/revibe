'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ShoppingBag, ArrowRight, Dna, Recycle, TrendingUp, ShieldCheck, Flame, Layers, Trophy } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Decorative Ambient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Hero Header */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>AI-Powered Circular Economy & Upcycling</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-charcoal-900 tracking-tight leading-[1.1]"
          >
            Turn Waste Into <span className="text-emerald-700">Worth.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-charcoal-600 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            AI-powered ideas that transform reusable waste into products, opportunities, and impact. Discover material DNA, craft DIY creations, or launch a sustainable micro-business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
          >
            <Link
              href="/upload"
              className="w-full sm:w-auto py-3.5 px-7 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm shadow-soft hover:shadow-soft-md transition-all btn-press flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Analyze My Waste</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/marketplace"
              className="w-full sm:w-auto py-3.5 px-7 rounded-2xl bg-white hover:bg-charcoal-50 text-charcoal-800 border border-charcoal-200 font-extrabold text-sm shadow-soft transition-all btn-press flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-charcoal-600" />
              <span>Explore Marketplace</span>
            </Link>
          </motion.div>
        </div>

        {/* 10-Second Hackathon-Impression: Interactive Waste Transformation Visual */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-charcoal-200 shadow-soft-lg max-w-5xl mx-auto space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-charcoal-100 pb-4">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 block">
                Live Interactive Process
              </span>
              <h3 className="text-base font-black text-charcoal-900">
                From Waste Image to Verified Commercial Asset
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
              100% Real-time AI
            </span>
          </div>

          {/* 4-Stage Connected Workflow Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Step 1: Upload */}
            <div className="p-4 rounded-2xl bg-charcoal-50 border border-charcoal-100 space-y-2 relative">
              <span className="text-[10px] font-mono font-bold text-charcoal-400">01 UPLOAD</span>
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=300&q=80"
                alt="Glass Bottle"
                className="w-full h-24 object-cover rounded-xl"
              />
              <h4 className="text-xs font-bold text-charcoal-900">Glass Beverage Bottle</h4>
              <p className="text-[11px] text-charcoal-500">Raw municipal discard</p>
            </div>

            {/* Step 2: AI Analysis */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2">
              <span className="text-[10px] font-mono font-bold text-emerald-700">02 AI VISION</span>
              <div className="p-2.5 rounded-xl bg-white border border-emerald-200/80 space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-bold text-charcoal-800">Confidence</span>
                  <span className="font-mono font-black text-emerald-700">94%</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="font-bold text-charcoal-800">Rescue Score</span>
                  <span className="font-mono font-black text-emerald-700">91/100</span>
                </div>
              </div>
              <h4 className="text-xs font-bold text-emerald-900">High Reusability DNA</h4>
              <p className="text-[11px] text-emerald-700">Multi-product viability</p>
            </div>

            {/* Step 3: Product Blueprint */}
            <div className="p-4 rounded-2xl bg-charcoal-50 border border-charcoal-100 space-y-2">
              <span className="text-[10px] font-mono font-bold text-charcoal-400">03 CREATION</span>
              <img
                src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=300&q=80"
                alt="Ambient Lamp"
                className="w-full h-24 object-cover rounded-xl"
              />
              <h4 className="text-xs font-bold text-charcoal-900">Ambient LED Lamp</h4>
              <p className="text-[11px] text-charcoal-500">DIY Step-by-Step Guide</p>
            </div>

            {/* Step 4: Value & Impact */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-2">
              <span className="text-[10px] font-mono font-bold text-amber-700">04 COMMERCE</span>
              <div className="p-2.5 rounded-xl bg-white border border-amber-200/80 space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-bold text-charcoal-800">Market Price</span>
                  <span className="font-mono font-black text-amber-800">₹380</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="font-bold text-charcoal-800">Profit Margin</span>
                  <span className="font-mono font-black text-emerald-700">78%</span>
                </div>
              </div>
              <h4 className="text-xs font-bold text-amber-900">List or Donate</h4>
              <p className="text-[11px] text-amber-700">+50 Eco Points Earned</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
