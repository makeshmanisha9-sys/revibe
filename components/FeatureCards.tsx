'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Palette, TrendingUp, ShoppingBag, HeartHandshake, Users, ArrowUpRight } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI Waste Detection',
    description: 'Upload images of discarded materials and let computer vision instantly identify precise waste types and reusable sub-components.',
    href: '/upload',
    actionText: 'Scan Waste Image',
    badge: 'Vision AI',
  },
  {
    icon: Palette,
    title: 'Creative Upcycling',
    description: 'Explore step-by-step DIY tutorials, required tools, difficulty ratings, and artistic home decor transformations.',
    href: '/upload',
    actionText: 'Discover DIY Ideas',
    badge: 'DIY Crafts',
  },
  {
    icon: TrendingUp,
    title: 'Business Opportunities',
    description: 'Evaluate real production costs, selling price suggestions, profit margins, and buyer demand to monetize upcycled products.',
    href: '/upload',
    actionText: 'Calculate Profit',
    badge: 'Micro-Business',
  },
  {
    icon: ShoppingBag,
    title: 'Marketplace',
    description: 'List upcycled creations for sale or discover eco-friendly products made from repurposed waste by artisans.',
    href: '/marketplace',
    actionText: 'Browse Store',
    badge: 'Buy & Sell',
  },
  {
    icon: HeartHandshake,
    title: 'Donation Hub',
    description: 'Donate raw waste materials or finished products directly to local makers, crafters, and zero-waste initiatives.',
    href: '/donation',
    actionText: 'Donate Materials',
    badge: 'Circular Hub',
  },
  {
    icon: Users,
    title: 'Community Feed',
    description: 'Share your upcycling creations, exchange tips, like and comment on community projects in real time.',
    href: '/community',
    actionText: 'Join Feed',
    badge: 'Realtime Feed',
  },
];

export const FeatureCards: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 text-white border-b border-emerald-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
            Platform Capabilities
          </h2>
          <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            End-to-End Waste-to-Wealth Ecosystem
          </p>
          <p className="text-sm text-slate-400">
            Every feature is fully interactive, backed by Supabase database persistence and live AI analysis.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl bg-emerald-950/40 border border-emerald-800/50 p-6 flex flex-col justify-between hover:border-emerald-500/60 hover:bg-emerald-900/30 transition-all shadow-lg hover:shadow-emerald-500/10"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-emerald-950 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-emerald-900/60">
                  <Link
                    href={feature.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors"
                  >
                    <span>{feature.actionText}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
