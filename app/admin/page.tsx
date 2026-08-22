'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { dataStore } from '@/lib/supabase/client';
import { Product, Donation, Post } from '@/types/database';
import { ShieldAlert, Users, ShoppingBag, HeartHandshake, Trash2, CheckCircle2, Lock } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { user, isAdmin, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [p, d, pst] = await Promise.all([
        dataStore.getProducts(),
        dataStore.getDonations(),
        dataStore.getPosts(),
      ]);
      setProducts(p);
      setDonations(d);
      setPosts(pst);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) loadData();
  }, [isAdmin]);

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-emerald-950/80 border border-red-800 text-center space-y-4">
          <div className="p-4 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 w-14 h-14 mx-auto flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Admin Access Restricted</h2>
          <p className="text-xs text-emerald-200/70">
            You need admin role credentials to view the moderation console.
          </p>
          <Link href="/login" className="inline-block px-5 py-2.5 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-xs">
            Log In as Admin (admin@revibe.org)
          </Link>
        </div>
      </div>
    );
  }

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Admin confirmation: Delete product listing?')) {
      await dataStore.deleteProduct(id);
      showToast('Product removed by admin', 'success');
      loadData();
    }
  };

  const handleDeletePost = async (id: string) => {
    if (confirm('Admin confirmation: Delete community post?')) {
      await dataStore.deletePost(id);
      showToast('Post moderated and deleted', 'success');
      loadData();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Admin Title */}
      <div className="flex items-center justify-between border-b border-emerald-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-bold mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>Platform Moderation Portal</span>
          </div>
          <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
          <p className="text-xs text-emerald-200/70 mt-1">Manage products, audit community content, and view overall statistics.</p>
        </div>
      </div>

      {/* Overview Analytics Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-800 space-y-1">
          <span className="text-xs font-bold text-emerald-400">Total Users</span>
          <p className="text-3xl font-black text-white">1,248</p>
        </div>
        <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-800 space-y-1">
          <span className="text-xs font-bold text-blue-400">Listed Products</span>
          <p className="text-3xl font-black text-white">{products.length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-800 space-y-1">
          <span className="text-xs font-bold text-pink-400">Material Donations</span>
          <p className="text-3xl font-black text-white">{donations.length}</p>
        </div>
        <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-800 space-y-1">
          <span className="text-xs font-bold text-purple-400">Community Posts</span>
          <p className="text-3xl font-black text-white">{posts.length}</p>
        </div>
      </div>

      {/* Moderation Tables */}
      <div className="space-y-8">
        {/* Marketplace Moderation */}
        <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <span>Moderate Marketplace Products ({products.length})</span>
          </h3>

          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.id} className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-800 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img src={p.image_url} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="font-bold text-white">{p.product_name}</p>
                    <p className="text-[10px] text-emerald-300/60">Seller: {p.seller?.name || 'User'} • Price: ₹{p.selling_price}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteProduct(p.id)}
                  className="px-3 py-1.5 rounded-lg bg-red-950/80 border border-red-800 text-red-300 hover:bg-red-900 font-bold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Community Moderation */}
        <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            <span>Moderate Community Posts ({posts.length})</span>
          </h3>

          <div className="space-y-3">
            {posts.map((pst) => (
              <div key={pst.id} className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-800 flex items-center justify-between gap-4 text-xs">
                <div>
                  <p className="font-bold text-white">{pst.product_name || 'Community Post'}</p>
                  <p className="text-emerald-200/80 line-clamp-1">{pst.description}</p>
                </div>
                <button
                  onClick={() => handleDeletePost(pst.id)}
                  className="px-3 py-1.5 rounded-lg bg-red-950/80 border border-red-800 text-red-300 hover:bg-red-900 font-bold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Post</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
