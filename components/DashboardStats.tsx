'use client';

import React from 'react';
import { DashboardStats as StatsType } from '@/types/database';
import { Sparkles, ShoppingBag, Gift, Users, Trophy, TrendingUp, Layers, CheckCircle } from 'lucide-react';

interface DashboardStatsProps {
  stats: StatsType;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statItems = [
    { label: 'Waste Analyzed', value: stats.wasteAnalyzed, icon: Sparkles, color: 'text-emerald-700 bg-emerald-50' },
    { label: 'Items Reused', value: stats.itemsReused, icon: CheckCircle, color: 'text-teal-700 bg-teal-50' },
    { label: 'Products Created', value: stats.productsCreated, icon: Layers, color: 'text-sky-700 bg-sky-50' },
    { label: 'Active Listings', value: stats.productsListed, icon: ShoppingBag, color: 'text-indigo-700 bg-indigo-50' },
    { label: 'Products Sold', value: stats.productsSold, icon: TrendingUp, color: 'text-purple-700 bg-purple-50' },
    { label: 'Donations Made', value: stats.donationsMade, icon: Gift, color: 'text-rose-700 bg-rose-50' },
    { label: 'Community Posts', value: stats.communityPosts, icon: Users, color: 'text-amber-700 bg-amber-50' },
    { label: 'ReVIBE Eco Score', value: `${stats.ecoScore} pts`, icon: Trophy, color: 'text-yellow-700 bg-yellow-50' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="p-4 rounded-3xl bg-white border border-charcoal-200 shadow-soft flex items-center gap-3.5"
          >
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-wider block truncate">
                {item.label}
              </span>
              <span className="text-base sm:text-lg font-black text-charcoal-900 truncate block mt-0.5">
                {item.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
