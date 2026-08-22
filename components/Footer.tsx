'use client';

import React from 'react';
import Link from 'next/link';
import { Recycle, Heart, Shield, Globe, Github, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-emerald-950 border-t border-emerald-900 text-emerald-200/80 text-sm py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Recycle className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">ReVIBE</span>
          </div>
          <p className="text-xs text-emerald-300/70 leading-relaxed">
            Recycle Waste. Create Value. Inspire Change.
            An AI-powered sustainability platform turning reusable waste into green income and community impact.
          </p>
          <div className="flex items-center gap-3 text-emerald-400">
            <a href="#" className="p-2 bg-emerald-900/60 rounded-lg hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="p-2 bg-emerald-900/60 rounded-lg hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="p-2 bg-emerald-900/60 rounded-lg hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">Quick Navigation</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/upload" className="hover:text-white transition-colors">Upload Waste</Link></li>
            <li><Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
          </ul>
        </div>

        {/* Community & Impact */}
        <div>
          <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">Impact & Hubs</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/donation" className="hover:text-white transition-colors">Donation Hub</Link></li>
            <li><Link href="/community" className="hover:text-white transition-colors">Community Feed</Link></li>
            <li><Link href="/dashboard" className="hover:text-white transition-colors">User Dashboard</Link></li>
            <li><Link href="/admin" className="hover:text-white transition-colors">Admin Portal</Link></li>
          </ul>
        </div>

        {/* Sustainability Note */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-2">Our Eco Guarantee</h4>
          <div className="p-3.5 rounded-xl bg-emerald-900/40 border border-emerald-800/60 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Zero-Greenwashing</span>
            </div>
            <p className="text-[11px] text-emerald-300/70">
              100% database-verified waste metrics and authentic upcycling ideas powered by Gemini AI.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/60 gap-3">
        <p>© {new Date().getFullYear()} ReVIBE. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Built with <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" /> for a Zero-Waste Future
        </p>
      </div>
    </footer>
  );
};
