'use client';

import React from 'react';
import { DashboardStats } from '@/types/database';
import { Sparkles, ShoppingBag, HeartHandshake, Users, DollarSign, Scale, CheckCircle2 } from 'lucide-react';

interface DashboardStatsProps {
  stats: DashboardStats;
}

export const DashboardStatsCard: React.FC<DashboardStatsProps> = ({ stats }) => {
  const cards = [
    { label: 'Waste Analyzed', value: stats.wasteAnalyzed, icon: Sparkles, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Products Created', value: stats.productsCreated, icon: ShoppingBag, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Donations Made', value: stats.donationsMade, icon: HeartHandshake, color: 'text-pink-400', bg: 'bg-pink-500/10' },
    { label: 'Community Posts', value: stats.communityPosts, icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Estimated Revenue', value: `₹${stats.estimatedRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Waste Reused', value: `${stats.wasteReusedKg.toFixed(1)} kg`, icon: Scale, color: 'text-teal-400', bg: 'bg-teal-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 space-y-2 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-emerald-300/70">{item.label}</span>
              <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xl font-black text-white">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
};
