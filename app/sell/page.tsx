'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { dataStore } from '@/lib/supabase/client';
import { PlusCircle, UploadCloud, ShoppingBag, Lock } from 'lucide-react';
import Link from 'next/link';

function SellForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Home Decor');
  const [wasteMaterial, setWasteMaterial] = useState('');
  const [costPrice, setCostPrice] = useState(80);
  const [sellingPrice, setSellingPrice] = useState(300);
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState(user?.location || 'Green City, CA');
  const [contactInfo, setContactInfo] = useState(user?.email || 'eco@revibe.org');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const nameQuery = searchParams?.get('name');
    const matQuery = searchParams?.get('material');
    const priceQuery = searchParams?.get('price');
    const costQuery = searchParams?.get('cost');

    if (nameQuery) setProductName(nameQuery);
    if (matQuery) setWasteMaterial(matQuery);
    if (priceQuery) setSellingPrice(Number(priceQuery));
    if (costQuery) setCostPrice(Number(costQuery));
  }, [searchParams]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-center space-y-4">
          <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-14 h-14 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Authentication Required</h2>
          <p className="text-xs text-emerald-200/70">
            Please log in to sell upcycled products on the ReVIBE marketplace.
          </p>
          <Link href="/login" className="inline-block px-5 py-2.5 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-xs">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !description || !wasteMaterial || !sellingPrice) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await dataStore.createProduct({
        seller_id: user?.id || 'demo-user-1',
        seller: {
          name: user?.name,
          location: user?.location,
          avatar_url: user?.avatar_url,
        },
        product_name: productName,
        description,
        category,
        waste_material: wasteMaterial,
        image_url: imageUrl,
        cost: Number(costPrice),
        selling_price: Number(sellingPrice),
        quantity: Number(quantity),
        location,
        contact_information: contactInfo,
        status: 'available',
      });

      showToast('Your product has been successfully listed!', 'success');
      router.push('/marketplace');
    } catch (err: any) {
      showToast('Failed to list product. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-emerald-950/80 border border-emerald-800 space-y-6 shadow-2xl">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-emerald-200 mb-1">Product Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Geometric Recycled Plastic Desk Lamp"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-emerald-200 mb-1">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              <option value="Home Decor" className="bg-emerald-950">Home Decor</option>
              <option value="Accessories" className="bg-emerald-950">Accessories</option>
              <option value="Stationery" className="bg-emerald-950">Stationery</option>
              <option value="Fashion" className="bg-emerald-950">Fashion</option>
              <option value="Gifts" className="bg-emerald-950">Gifts</option>
              <option value="Eco Products" className="bg-emerald-950">Eco Products</option>
              <option value="Others" className="bg-emerald-950">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-200 mb-1">Waste Material Used *</label>
            <input
              type="text"
              required
              placeholder="e.g. Plastic Bottles, Denim Fabric, Coconut Shell"
              value={wasteMaterial}
              onChange={(e) => setWasteMaterial(e.target.value)}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-emerald-200 mb-1">Product Image URL *</label>
          <input
            type="url"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-emerald-200 mb-1">Description *</label>
          <textarea
            required
            rows={3}
            placeholder="Describe how this product was crafted and its eco benefits..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-emerald-200 mb-1">Cost Price (₹)</label>
            <input
              type="number"
              min="0"
              value={costPrice}
              onChange={(e) => setCostPrice(Number(e.target.value))}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-200 mb-1">Selling Price (₹) *</label>
            <input
              type="number"
              min="1"
              required
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-200 mb-1">Stock Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-emerald-200 mb-1">Location *</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-200 mb-1">Contact Information *</label>
            <input
              type="text"
              required
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>{submitting ? 'Publishing Listing...' : 'Publish Product to Marketplace'}</span>
      </button>
    </form>
  );
}

export default function SellPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-white">List Your Upcycled Product</h1>
        <p className="text-xs text-emerald-200/70">Turn discarded waste into income by selling your creations directly on ReVIBE.</p>
      </div>

      <Suspense fallback={
        <div className="p-8 text-center text-xs text-emerald-300">Loading form...</div>
      }>
        <SellForm />
      </Suspense>
    </div>
  );
}
