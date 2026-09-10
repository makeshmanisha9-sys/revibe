'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { dataStore } from '@/lib/supabase/client';
import { Product, Donation, Post, Order } from '@/types/database';
import { ShieldAlert, Users, ShoppingBag, Gift, Trash2, CheckCircle2, Lock, Shield, Layers, FileDown } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { user, isAdmin, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [p, d, pst, ord] = await Promise.all([
        dataStore.getProducts(),
        dataStore.getDonations(),
        dataStore.getPosts(),
        dataStore.getOrders(),
      ]);
      setProducts(p);
      setDonations(d);
      setPosts(pst);
      setOrders(ord);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) loadData();
    else setLoading(false);
  }, [isAdmin]);

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-charcoal-200 text-center space-y-4 shadow-soft">
          <div className="p-4 rounded-2xl bg-rose-50 text-rose-700 w-14 h-14 mx-auto flex items-center justify-center">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-charcoal-900">Admin Access Restricted</h2>
          <p className="text-xs text-charcoal-500">
            You need administrator credentials to access the moderation console and platform governance.
          </p>
          <Link
            href="/login"
            className="inline-block px-5 py-2.5 rounded-xl bg-charcoal-900 text-white font-bold text-xs btn-press"
          >
            Log In as Admin (admin@revibe.eco)
          </Link>
        </div>
      </div>
    );
  }

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Admin confirmation: Delete product listing?')) {
      await dataStore.deleteProduct(id);
      showToast('Product removed by admin moderation', 'info');
      loadData();
    }
  };

  const handleDeletePost = async (id: string) => {
    if (confirm('Admin confirmation: Delete community post?')) {
      await dataStore.deletePost(id);
      showToast('Post moderated and removed', 'info');
      loadData();
    }
  };

  const handleExportData = () => {
    const report = {
      timestamp: new Date().toISOString(),
      productsCount: products.length,
      donationsCount: donations.length,
      postsCount: posts.length,
      ordersCount: orders.length,
      products,
      donations,
      posts,
      orders,
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `revibe-audit-report-${Date.now()}.json`;
    a.click();
    showToast('Platform Audit Report exported! 📄', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Admin Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-charcoal-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold mb-2">
            <Shield className="w-3.5 h-3.5 text-rose-600" />
            <span>Platform Governance & Content Moderation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-charcoal-900">Admin Dashboard</h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Real-time oversight over marketplace listings, community posts, scrap donations, and order integrity.
          </p>
        </div>

        <button
          onClick={handleExportData}
          className="px-4 py-2.5 rounded-2xl bg-charcoal-900 hover:bg-charcoal-800 text-white text-xs font-bold flex items-center gap-1.5 btn-press shadow-soft"
        >
          <FileDown className="w-4 h-4" />
          <span>Export Audit Report</span>
        </button>
      </div>

      {/* Analytics Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-charcoal-200 shadow-soft space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">Total Users</span>
          <p className="text-2xl sm:text-3xl font-black text-charcoal-900">1,248</p>
          <span className="text-[10px] text-emerald-700 font-semibold">+14% this month</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-charcoal-200 shadow-soft space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">Listed Products</span>
          <p className="text-2xl sm:text-3xl font-black text-charcoal-900">{products.length}</p>
          <span className="text-[10px] text-emerald-700 font-semibold">Active in store</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-charcoal-200 shadow-soft space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">Material Donations</span>
          <p className="text-2xl sm:text-3xl font-black text-charcoal-900">{donations.length}</p>
          <span className="text-[10px] text-emerald-700 font-semibold">Zero-landfill stream</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-charcoal-200 shadow-soft space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400">Community Posts</span>
          <p className="text-2xl sm:text-3xl font-black text-charcoal-900">{posts.length}</p>
          <span className="text-[10px] text-emerald-700 font-semibold">Public transformations</span>
        </div>
      </div>

      {/* Moderation Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Marketplace Moderation */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-charcoal-200 shadow-soft space-y-4">
          <h3 className="text-sm font-black text-charcoal-900 flex items-center gap-2 border-b border-charcoal-100 pb-3">
            <ShoppingBag className="w-4 h-4 text-emerald-700" />
            <span>Marketplace Listings ({products.length})</span>
          </h3>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {products.map((p) => (
              <div
                key={p.id}
                className="p-3.5 rounded-2xl bg-charcoal-50 border border-charcoal-100 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img src={p.image_url} alt="" className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-charcoal-900 truncate">{p.product_name}</p>
                    <p className="text-[10px] text-charcoal-500">
                      Seller: {p.seller?.name || 'User'} • ₹{p.selling_price}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteProduct(p.id)}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs flex items-center gap-1 btn-press flex-shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Community Posts Moderation */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-charcoal-200 shadow-soft space-y-4">
          <h3 className="text-sm font-black text-charcoal-900 flex items-center gap-2 border-b border-charcoal-100 pb-3">
            <Users className="w-4 h-4 text-purple-700" />
            <span>Community Feed Posts ({posts.length})</span>
          </h3>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {posts.map((pst) => (
              <div
                key={pst.id}
                className="p-3.5 rounded-2xl bg-charcoal-50 border border-charcoal-100 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img src={pst.image_url} alt="" className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-charcoal-900 truncate">{pst.product_name || 'Transformation Post'}</p>
                    <p className="text-[10px] text-charcoal-500 line-clamp-1">{pst.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleDeletePost(pst.id)}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs flex items-center gap-1 btn-press flex-shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
