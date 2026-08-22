'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Cpu, Compass, Lightbulb, Hammer, Share2 } from 'lucide-react';

const steps = [
  { step: '01', title: 'Upload Waste', icon: UploadCloud, desc: 'Drag and drop waste photos (plastic, glass, cardboard, denim).' },
  { step: '02', title: 'AI Identifies Material', icon: Cpu, desc: 'Gemini AI extracts material, category, & confidence score.' },
  { step: '03', title: 'Creative / Business Mode', icon: Compass, desc: 'Select DIY artistic mode or commercial financial mode.' },
  { step: '04', title: 'Generate Product Ideas', icon: Lightbulb, desc: 'Receive step-by-step assembly guides & cost calculations.' },
  { step: '05', title: 'Create Product', icon: Hammer, desc: 'Assemble the upcycled creation using suggested tools.' },
  { step: '06', title: 'Sell / Donate / Share', icon: Share2, desc: 'List on Marketplace, donate materials, or post to feed.' },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-emerald-950 text-white relative overflow-hidden border-b border-emerald-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Simple 6-Step Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            How ReVIBE Works
          </h2>
          <p className="text-sm text-emerald-200/80">
            From raw discarded waste to profitable eco-products and community recognition.
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative rounded-2xl bg-emerald-900/40 border border-emerald-800/60 p-6 space-y-4 hover:border-emerald-500/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-emerald-500/40 group-hover:text-emerald-400 transition-colors">
                    {item.step}
                  </span>
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-emerald-200/70 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
