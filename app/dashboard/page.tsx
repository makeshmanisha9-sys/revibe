'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { DashboardStats, Product, Donation, Post, WasteAnalysis } from '@/types/database';
import { dataStore } from '@/lib/supabase/client';
import { DashboardStatsCard } from '@/components/DashboardStats';
import { ProductCard } from '@/components/ProductCard';
import { DonationCard } from '@/components/DonationCard';
import { PostCard } from '@/components/PostCard';
import { LayoutDashboard, ShoppingBag, HeartHandshake, Sparkles, Users, Lock, Tag } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'donations' | 'analyses' | 'posts'>('products');
  
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
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-center space-y-4">
          <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-14 h-14 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Authentication Required</h2>
          <p className="text-xs text-emerald-200/70">
            Please log in to view your impact metrics, products, and donations.
          </p>
          <Link href="/login" className="inline-block px-5 py-2.5 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-xs">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* User Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/80 pb-6">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
            alt={user?.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Welcome back, {user?.name}!</h1>
            <p className="text-xs text-emerald-300/80">
              {user?.location || 'Green City'} • {user?.bio || 'Zero-waste eco-innovator'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href="/upload" className="px-4 py-2 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-xs hover:bg-emerald-400 transition-all">
            + New Scan
          </Link>
          <Link href="/sell" className="px-4 py-2 rounded-xl bg-emerald-900 border border-emerald-700 text-emerald-200 font-bold text-xs hover:bg-emerald-800 transition-all">
            + Sell Product
          </Link>
        </div>
      </div>

      {/* Metrics Section */}
      {stats && <DashboardStatsCard stats={stats} />}

      {/* Navigation Tabs */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-emerald-800/80 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products' ? 'bg-emerald-600 text-white' : 'text-emerald-300/80 hover:bg-emerald-900/40'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-emerald-300" />
            <span>My Products ({myProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('donations')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'donations' ? 'bg-emerald-600 text-white' : 'text-emerald-300/80 hover:bg-emerald-900/40'
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-pink-400" />
            <span>My Donations ({myDonations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analyses')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'analyses' ? 'bg-emerald-600 text-white' : 'text-emerald-300/80 hover:bg-emerald-900/40'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>My AI Analyses ({myAnalyses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'posts' ? 'bg-emerald-600 text-white' : 'text-emerald-300/80 hover:bg-emerald-900/40'
            }`}
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span>My Feed Posts ({myPosts.length})</span>
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'products' && (
          <div>
            {myProducts.length === 0 ? (
              <div className="p-8 text-center bg-emerald-950/40 border border-dashed border-emerald-800 rounded-2xl space-y-2">
                <p className="text-sm font-bold text-white">No products listed yet.</p>
                <Link href="/sell" className="inline-block text-xs font-bold text-emerald-400 hover:underline">
                  List your first upcycled product →
                </Link>
              </div>
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
              <div className="p-8 text-center bg-emerald-950/40 border border-dashed border-emerald-800 rounded-2xl space-y-2">
                <p className="text-sm font-bold text-white">No material donations created yet.</p>
                <Link href="/donation/create" className="inline-block text-xs font-bold text-emerald-400 hover:underline">
                  Donate surplus waste materials →
                </Link>
              </div>
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
          <div className="space-y-4">
            {myAnalyses.length === 0 ? (
              <div className="p-8 text-center bg-emerald-950/40 border border-dashed border-emerald-800 rounded-2xl space-y-2">
                <p className="text-sm font-bold text-white">No previous AI analyses recorded.</p>
                <Link href="/upload" className="inline-block text-xs font-bold text-emerald-400 hover:underline">
                  Scan a waste photo with Gemini AI →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myAnalyses.map((a) => (
                  <div key={a.id} className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">{a.detected_material}</p>
                      <p className="text-[10px] text-emerald-300/60">{a.waste_category} • Confidence: {a.confidence}%</p>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">{new Date(a.created_at).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'posts' && (
          <div>
            {myPosts.length === 0 ? (
              <div className="p-8 text-center bg-emerald-950/40 border border-dashed border-emerald-800 rounded-2xl space-y-2">
                <p className="text-sm font-bold text-white">No community posts published yet.</p>
                <Link href="/community" className="inline-block text-xs font-bold text-emerald-400 hover:underline">
                  Post your first creation to the community feed →
                </Link>
              </div>
            ) : (
              <div className="space-y-6 max-w-2xl">
                {myPosts.map((p) => (
                  <PostCard key={p.id} post={p} onPostUpdated={() => {}} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
