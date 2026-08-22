import { Hero } from '@/components/Hero';
import { FeatureCards } from '@/components/FeatureCards';
import { HowItWorks } from '@/components/HowItWorks';
import Link from 'next/link';
import { Sparkles, ArrowRight, Leaf } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <Hero />

      {/* Feature Cards Grid */}
      <FeatureCards />

      {/* Process Timeline */}
      <HowItWorks />

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-emerald-900 via-emerald-950 to-emerald-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span>Join 10,000+ Zero-Waste Innovators</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Ready to Turn Your Waste Into Worth?
          </h2>

          <p className="text-sm sm:text-base text-emerald-200/80 max-w-2xl mx-auto">
            Upload your first waste image today, get Gemini AI material detection, step-by-step DIY upcycling guides, and launch your green micro-business.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/upload"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-sm transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Free AI Waste Scan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/marketplace"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-950/80 border border-emerald-700 hover:bg-emerald-900 text-emerald-200 font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Marketplace</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
