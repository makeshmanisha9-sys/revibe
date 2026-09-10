'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardStats as StatsType, Product, Donation, Post, WasteAnalysis } from '@/types/database';
import { dataStore } from '@/lib/supabase/client';
import { DashboardStats } from '@/components/DashboardStats';
import { ImpactWidget } from '@/components/ImpactWidget';
import { ProductCard } from '@/components/ProductCard';
import { DonationCard } from '@/components/DonationCard';
import { PostCard } from '@/components/PostCard';
import { BadgesGrid } from '@/components/BadgesGrid';
import { EmptyState } from '@/components/EmptyState';
import {
  LayoutDashboard,
  ShoppingBag,
  Gift,
  Sparkles,
  Users,
  Lock,
  Flame,
  PlusCircle,
  Recycle,
  Trophy,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, profile, isAuthenticated } = useAuth();
  const [stats, setStats] = useState<StatsType | null>(null);
  const [activeTab, setActiveTab] = useState<'impact' | 'products' | 'donations' | 'analyses' | 'posts' | 'badges'>('impact');

  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [myDonations, setMyDonations] = useState<Donation[]>([]);
  const [myAnalyses, setMyAnalyses] = useState<WasteAnalysis[]>([]);
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      try {
        const s = await dataStore.getDashboardStats(user.id);
        setStats(s);

        const prods = await dataStore.getProducts();
        setMyProducts(prods.filter((p) => p.seller_id === user.id));

        const dons = await dataStore.getDonations();
        setMyDonations(dons.filter((d) => d.donor_id === user.id));

        const ans = await dataStore.getAnalyses(user.id);
        setMyAnalyses(ans);

        const psts = await dataStore.getPosts();
        setMyPosts(psts.filter((p) => p.user_id === user.id));
      } catch (e) {
        console.error('Failed to load dashboard data', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener('revibe_db_updated', handleUpdate);
    return () => window.removeEventListener('revibe_db_updated', handleUpdate);
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-charcoal-200 text-center space-y-4 shadow-soft">
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 w-14 h-14 mx-auto flex items-center justify-center">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-charcoal-900">Authentication Required</h2>
          <p className="text-xs text-charcoal-500">
            Please log in to view your impact metrics, products, and activity records.
          </p>
          <div className="pt-2 flex gap-3">
            <Link href="/login" className="flex-1 py-3 rounded-xl bg-emerald-700 text-white font-bold text-xs btn-press">
              Log In
            </Link>
            <Link href="/register" className="flex-1 py-3 rounded-xl border border-charcoal-300 text-charcoal-800 font-bold text-xs btn-press">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-charcoal-200 pb-6">
        <div className="flex items-center gap-4">
          <img
            src={profile?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
            alt={profile?.name || 'User'}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-600/30 shadow-soft"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-charcoal-900">
                Welcome back, {profile?.name || 'Aanya Sharma'}!
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                {profile?.role === 'admin' ? 'Administrator' : 'Eco Creator'}
              </span>
            </div>
            <p className="text-xs text-charcoal-500 mt-1">
              {profile?.location || 'Bengaluru, India'} • {profile?.bio || 'Upcycling designer & circular economy leader'}
            </p>
          </div>
        </div>

        <div className="flex gap-2 self-start sm:self-auto">
          <Link
            href="/upload"
            className="px-4 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-soft transition-all btn-press flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scan Waste</span>
          </Link>
          <Link
            href="/sell"
            className="px-4 py-2.5 rounded-2xl border border-charcoal-300 hover:bg-charcoal-100 text-charcoal-800 font-bold text-xs transition-colors btn-press flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Sell Product</span>
          </Link>
        </div>
      </div>

      {/* 8-Card Database Aggregated Stats */}
      {stats && <DashboardStats stats={stats} />}

      {/* Navigation Tabs */}
      <div className="space-y-6">
        <div className="flex items-center gap-1.5 border-b border-charcoal-200 pb-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('impact')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'impact' ? 'bg-emerald-700 text-white shadow-xs' : 'text-charcoal-600 hover:bg-charcoal-100'
            }`}
          >
            Verified Impact
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'products' ? 'bg-emerald-700 text-white shadow-xs' : 'text-charcoal-600 hover:bg-charcoal-100'
            }`}
          >
            My Products ({myProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('donations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'donations' ? 'bg-emerald-700 text-white shadow-xs' : 'text-charcoal-600 hover:bg-charcoal-100'
            }`}
          >
            My Donations ({myDonations.length})
          </button>
          <button
            onClick={() => setActiveTab('analyses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'analyses' ? 'bg-emerald-700 text-white shadow-xs' : 'text-charcoal-600 hover:bg-charcoal-100'
            }`}
          >
            AI Analyses ({myAnalyses.length})
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'posts' ? 'bg-emerald-700 text-white shadow-xs' : 'text-charcoal-600 hover:bg-charcoal-100'
            }`}
          >
            Feed Posts ({myPosts.length})
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'impact' && stats && (
          <div className="space-y-6">
            <ImpactWidget stats={stats} />
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            {myProducts.length === 0 ? (
              <EmptyState
                icon={ShoppingBag}
                title="No products listed yet"
                description="List your upcycled products to start selling to eco-conscious buyers."
                actionText="List a Product"
                actionHref="/sell"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'donations' && (
          <div>
            {myDonations.length === 0 ? (
              <EmptyState
                icon={Gift}
                title="No material donations listed yet"
                description="Donate clean raw waste materials or finished crafts to community members."
                actionText="Create Donation Listing"
                actionHref="/donation/create"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myDonations.map((d) => (
                  <DonationCard key={d.id} donation={d} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'analyses' && (
          <div>
            {myAnalyses.length === 0 ? (
              <EmptyState
                icon={Sparkles}
                title="No AI waste analyses recorded yet"
                description="Upload an image of plastic, glass, cardboard, or fabric to extract Waste DNA."
                actionText="Scan Waste Now"
                actionHref="/upload"
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myAnalyses.map((a) => (
                  <div
                    key={a.id}
                    className="p-5 rounded-3xl bg-white border border-charcoal-200 shadow-soft flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                        ♻️
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-charcoal-900">{a.detected_material}</h4>
                        <p className="text-[11px] text-charcoal-500">
                          {a.waste_category} • {a.confidence}% confidence
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-charcoal-400">
                      {new Date(a.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'posts' && (
          <div>
            {myPosts.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No community posts published yet"
                description="Share your before and after upcycling transformations to inspire the circular network."
                actionText="Share Creation"
                actionHref="/community"
              />
            ) : (
              <div className="space-y-6 max-w-2xl mx-auto">
                {myPosts.map((p) => (
                  <PostCard key={p.id} post={p} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
