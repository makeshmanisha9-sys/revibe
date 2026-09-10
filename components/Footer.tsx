import React from 'react';
import Link from 'next/link';
import { Recycle, Heart, Shield, Sparkles, ExternalLink, Globe, Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-charcoal-900 text-charcoal-300 border-t border-charcoal-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Recycle className="w-5 h-5 animate-spin-slow" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                Re<span className="text-emerald-400">VIBE</span>
              </span>
            </div>
            <p className="text-charcoal-400 leading-relaxed text-xs">
              Recycle Waste. Create Value. Inspire Change. Transforming discarded household and industrial waste into profitable upcycled assets.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400 font-semibold">
              <Leaf className="w-3.5 h-3.5" />
              <span>Verifiable Circular Economy</span>
            </div>
          </div>

          {/* Col 2: Core Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform Modules</h4>
            <ul className="space-y-2 text-charcoal-400">
              <li>
                <Link href="/upload" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>AI Waste Identification</span>
                </Link>
              </li>
              <li>
                <Link href="/combination-lab" className="hover:text-emerald-400 transition-colors">
                  Waste Combination Lab
                </Link>
              </li>
              <li>
                <Link href="/challenges" className="hover:text-emerald-400 transition-colors">
                  Challenge Me Arena
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-emerald-400 transition-colors">
                  Upcycled Marketplace
                </Link>
              </li>
              <li>
                <Link href="/donation" className="hover:text-emerald-400 transition-colors">
                  Donation & Raw Scrap Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Community & Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Social & Impact</h4>
            <ul className="space-y-2 text-charcoal-400">
              <li>
                <Link href="/community" className="hover:text-emerald-400 transition-colors">
                  Creator Transformations Feed
                </Link>
              </li>
              <li>
                <Link href="/inspiration" className="hover:text-emerald-400 transition-colors">
                  Inspiration Collections
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">
                  Personal Impact Calculator
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  Our Sustainability Mission
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Transparency */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Defensible Data</h4>
            <p className="text-charcoal-400 text-[11px] leading-relaxed">
              All environmental statistics and value estimates are computed using defensible conversion ratios from real user action records.
            </p>
            <div className="p-3 rounded-xl bg-charcoal-800/80 border border-charcoal-700 text-[11px] text-charcoal-300">
              🌱 Built for global sustainability & circular economy leadership.
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-charcoal-500">
          <p>© {new Date().getFullYear()} ReVIBE Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-charcoal-300">Privacy & Terms</Link>
            <Link href="/about" className="hover:text-charcoal-300">Conversion Factors</Link>
            <Link href="/admin" className="hover:text-emerald-400">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
