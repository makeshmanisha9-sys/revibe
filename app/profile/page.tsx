'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { dataStore } from '@/lib/supabase/client';
import { Badge, Product, Donation, Post, Collection } from '@/types/database';
import { BadgesGrid } from '@/components/BadgesGrid';
import { ProductCard } from '@/components/ProductCard';
import { DonationCard } from '@/components/DonationCard';
import { PostCard } from '@/components/PostCard';
import { EmptyState } from '@/components/EmptyState';
import { User, MapPin, Mail, Save, Lock, Trophy, ShoppingBag, Gift, Users, Bookmark, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, profile, isAuthenticated, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'profile' | 'badges' | 'products' | 'donations' | 'community'>('profile');

  const [name, setName] = useState(profile?.name || user?.name || '');
  const [location, setLocation] = useState(profile?.location || user?.location || '');
  const [bio, setBio] = useState(profile?.bio || user?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || user?.avatar_url || '');
  const [submitting, setSubmitting] = useState(false);

  const [badges, setBadges] = useState<Badge[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setLocation(profile.location || '');
      setBio(profile.bio || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [profile]);

  useEffect(() => {
    async function load() {
      if (!user) return;
      const b = await dataStore.getBadges(user.id);
      setBadges(b);

      const prods = await dataStore.getProducts();
      setProducts(prods.filter((p) => p.seller_id === user.id));

      const dons = await dataStore.getDonations();
      setDonations(dons.filter((d) => d.donor_id === user.id));

      const psts = await dataStore.getPosts();
      setPosts(psts.filter((p) => p.user_id === user.id));
    }
    load();
  }, [user]);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-charcoal-200 text-center space-y-4 shadow-soft">
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 w-14 h-14 mx-auto flex items-center justify-center">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-charcoal-900">Authentication Required</h2>
          <p className="text-xs text-charcoal-500">
            Please log in or create an account to view and manage your profile and badges.
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const success = await updateProfile({ name, location, bio, avatar_url: avatarUrl });
    setSubmitting(false);
    if (success) {
      showToast('Profile updated successfully! ✓', 'success');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Profile Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-charcoal-200 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <img
            src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
            alt={name || user.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-emerald-600/30 shadow-soft"
          />
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-black text-charcoal-900">{name || user.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                {profile?.role === 'admin' ? '🛡️ Administrator' : '🌱 Eco Creator'}
              </span>
            </div>
            <p className="text-xs text-emerald-800 font-semibold">{user.email}</p>
            <p className="text-xs text-charcoal-500 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-charcoal-400" />
              <span>{location || 'India'}</span>
            </p>
          </div>
        </div>

        {/* Eco Score Badge */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center flex-shrink-0">
          <span className="text-[10px] uppercase font-extrabold text-amber-800 tracking-wider block">
            ReVIBE Eco Score
          </span>
          <div className="text-2xl font-black text-amber-950 mt-0.5">
            {profile?.eco_points || 340} <span className="text-xs font-normal text-amber-700">pts</span>
          </div>
          <span className="text-[10px] text-amber-800 font-semibold block mt-0.5">
            {badges.filter((b) => b.unlocked).length} Badges Earned
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="flex items-center gap-1.5 border-b border-charcoal-200 pb-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'profile' ? 'bg-emerald-700 text-white shadow-xs' : 'text-charcoal-600 hover:bg-charcoal-100'
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'badges' ? 'bg-emerald-700 text-white shadow-xs' : 'text-charcoal-600 hover:bg-charcoal-100'
            }`}
          >
            Achievements & Badges ({badges.filter((b) => b.unlocked).length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'products' ? 'bg-emerald-700 text-white shadow-xs' : 'text-charcoal-600 hover:bg-charcoal-100'
            }`}
          >
            Listed Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('donations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'donations' ? 'bg-emerald-700 text-white shadow-xs' : 'text-charcoal-600 hover:bg-charcoal-100'
            }`}
          >
            Donations ({donations.length})
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'community' ? 'bg-emerald-700 text-white shadow-xs' : 'text-charcoal-600 hover:bg-charcoal-100'
            }`}
          >
            Posts ({posts.length})
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white border border-charcoal-200 space-y-6 shadow-soft max-w-2xl">
            <h3 className="text-sm font-black text-charcoal-900 border-b border-charcoal-100 pb-3">
              Account Information
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-charcoal-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal-700 mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal-700 mb-1">Avatar Image URL</label>
                <input
                  type="url"
                  required
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal-700 mb-1">Eco Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="py-3 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-black text-xs btn-press shadow-soft flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{submitting ? 'Saving Changes...' : 'Save Profile Changes'}</span>
            </button>
          </form>
        )}

        {activeTab === 'badges' && (
          <BadgesGrid badges={badges} currentEcoPoints={profile?.eco_points || 340} />
        )}

        {activeTab === 'products' && (
          <div>
            {products.length === 0 ? (
              <EmptyState
                icon={ShoppingBag}
                title="No products listed yet"
                description="List your handcrafted upcycled creations on the marketplace."
                actionText="List Product"
                actionHref="/sell"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'donations' && (
          <div>
            {donations.length === 0 ? (
              <EmptyState
                icon={Gift}
                title="No donations created yet"
                description="Donate surplus raw materials to local makers."
                actionText="Donate Materials"
                actionHref="/donation/create"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donations.map((d) => (
                  <DonationCard key={d.id} donation={d} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'community' && (
          <div>
            {posts.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No community posts yet"
                description="Share your transformation stories to inspire others."
                actionText="Share Creation"
                actionHref="/community"
              />
            ) : (
              <div className="space-y-6 max-w-2xl mx-auto">
                {posts.map((p) => (
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
