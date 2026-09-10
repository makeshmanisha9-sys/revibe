'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Palette,
  Briefcase,
  ShoppingBag,
  Gift,
  Users,
  Layers,
  Trophy,
  Compass,
  Bot,
  ArrowRight,
} from 'lucide-react';

const FEATURES = [
  {
    title: '🤖 AI Waste Detection',
    description: 'Instant multimodal vision material identification, Waste DNA generation, and deterministic Rescue Score calculation.',
    href: '/upload',
    color: 'from-emerald-700 to-teal-800',
    badge: 'Core Vision AI',
  },
  {
    title: '🎨 Creative Upcycling',
    description: 'Personalized step-by-step DIY instructions with required tools, materials, estimated time, and dynamic YouTube video tutorials.',
    href: '/upload',
    color: 'from-sky-700 to-indigo-800',
    badge: 'DIY Intelligence',
  },
  {
    title: '💰 Business Opportunities',
    description: 'Commercial unit economics analysis: production cost, market price, profit margin %, and verified target customer personas.',
    href: '/upload',
    color: 'from-amber-700 to-yellow-800',
    badge: 'Micro-Enterprise',
  },
  {
    title: '🛍️ Upcycled Marketplace',
    description: 'Buy and sell authentic handcrafted upcycled products with real order tracking from Pending to Delivery.',
    href: '/marketplace',
    color: 'from-emerald-800 to-emerald-900',
    badge: 'Circular Commerce',
  },
  {
    title: '🎁 Raw Scrap & Donation Hub',
    description: 'Connect raw recyclable materials (plastic, glass, cardboard, textiles) with makers, schools, and NGOs.',
    href: '/donation',
    color: 'from-teal-700 to-emerald-800',
    badge: 'Zero Landfill',
  },
  {
    title: '🌱 Community Social Feed',
    description: 'Instagram-style feed to publish Before/After transformation stories, earn likes, comments, and inspire other creators.',
    href: '/community',
    color: 'from-purple-700 to-indigo-800',
    badge: 'Real-time Social',
  },
  {
    title: '🧪 Waste Combination Lab',
    description: 'Mix multiple waste streams (e.g. Plastic + Cardboard + Fabric) to generate complex multi-material product blueprints.',
    href: '/combination-lab',
    color: 'from-teal-800 to-sky-900',
    badge: 'Multi-Material',
  },
  {
    title: '🎮 Challenge Me Arena',
    description: 'Timed upcycling challenges with budget and skill constraints. Upload finished creation for AI vision verification.',
    href: '/challenges',
    color: 'from-amber-800 to-orange-900',
    badge: 'Gamification',
  },
  {
    title: '📌 Inspiration Board',
    description: 'Pinterest-style masonry board to discover, bookmark, and organize upcycling ideas into custom folders.',
    href: '/inspiration',
    color: 'from-rose-800 to-pink-900',
    badge: 'Collections',
  },
];

export function FeatureCards() {
  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 block">
            End-to-End Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-charcoal-900">
            Everything Needed to Turn Discards Into Value
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500">
            From smart computer vision analysis to commercial marketplace transactions and verified environmental impact tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => (
            <Link
              key={idx}
              href={feat.href}
              className="group p-6 rounded-3xl bg-white border border-charcoal-200 shadow-soft hover:shadow-soft-md transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-charcoal-100 text-charcoal-700 text-[10px] font-extrabold uppercase tracking-wide">
                    {feat.badge}
                  </span>
                  <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-base font-black text-charcoal-900 group-hover:text-emerald-800 transition-colors">
                  {feat.title}
                </h3>

                <p className="text-xs text-charcoal-600 leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>

              <div className="pt-2 border-t border-charcoal-100 flex items-center text-xs font-bold text-emerald-700">
                <span>Explore Module</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
