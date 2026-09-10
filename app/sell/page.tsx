'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { dataStore } from '@/lib/supabase/client';
import { PlusCircle, UploadCloud, ShoppingBag, Lock, Sparkles, Check, DollarSign } from 'lucide-react';
import Link from 'next/link';

function SellForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, profile, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Home Decor' | 'Accessories' | 'Stationery' | 'Fashion' | 'Gifts' | 'Eco Products' | 'Others'>('Home Decor');
  const [wasteMaterial, setWasteMaterial] = useState('');
  const [costPrice, setCostPrice] = useState(80);
  const [sellingPrice, setSellingPrice] = useState(300);
  const [quantity, setQuantity] = useState(4);
  const [location, setLocation] = useState(profile?.location || 'Bengaluru, India');
  const [contactInfo, setContactInfo] = useState(profile?.email || 'creator@revibe.eco | +91 98765 43210');
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
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-charcoal-200 text-center space-y-4 shadow-soft">
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 w-14 h-14 mx-auto flex items-center justify-center">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-charcoal-900">Authentication Required</h2>
          <p className="text-xs text-charcoal-500">
            Please log in or create an account to list upcycled products on the ReVIBE marketplace.
          </p>
          <div className="pt-2 flex gap-3">
            <Link href="/login" className="flex-1 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs btn-press">
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
    if (!productName || !description || !wasteMaterial || !sellingPrice) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await dataStore.createProduct({
        seller_id: user?.id || 'demo-user-1',
        seller: {
          id: user?.id,
          name: profile?.name || 'Aanya Sharma',
          location: location || profile?.location || 'India',
          avatar_url: profile?.avatar_url,
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

      showToast('Your product has been successfully listed! +50 Eco Points 🛍️', 'success');
      router.push('/marketplace');
    } catch (err: any) {
      showToast('Failed to list product. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-white border border-charcoal-200 space-y-6 shadow-soft">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1">Product Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Geometric Recycled Plastic Desk Lamp"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Category *</label>
            <select
              value={category}
              onChange={(e: any) => setCategory(e.target.value)}
              className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-xs text-charcoal-900 font-semibold focus:outline-none focus:border-emerald-600"
            >
              <option value="Home Decor">Home Decor</option>
              <option value="Accessories">Accessories</option>
              <option value="Stationery">Stationery</option>
              <option value="Fashion">Fashion</option>
              <option value="Gifts">Gifts</option>
              <option value="Eco Products">Eco Products</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Waste Material Used *</label>
            <input
              type="text"
              required
              placeholder="e.g. Plastic Bottles, Denim Fabric, Coconut Shell"
              value={wasteMaterial}
              onChange={(e) => setWasteMaterial(e.target.value)}
              className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1">Product Photo URL *</label>
          <input
            type="url"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal-700 mb-1">Product Description *</label>
          <textarea
            required
            rows={3}
            placeholder="Describe how this upcycled product was crafted and its sustainability benefits..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Cost Price (₹)</label>
            <input
              type="number"
              min="0"
              value={costPrice}
              onChange={(e) => setCostPrice(Number(e.target.value))}
              className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Selling Price (₹) *</label>
            <input
              type="number"
              min="1"
              required
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Available Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Location *</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-700 mb-1">Contact Details *</label>
            <input
              type="text"
              required
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-xs text-charcoal-900 focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-soft transition-all btn-press disabled:opacity-50"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>{submitting ? 'Publishing Listing...' : 'Publish Product to Marketplace (+50 Eco Points)'}</span>
      </button>
    </form>
  );
}

export default function SellPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Circular Micro-Enterprise</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-charcoal-900">List Your Upcycled Product</h1>
        <p className="text-xs sm:text-sm text-charcoal-500">
          Transform discarded waste into income by selling your creations directly on the ReVIBE marketplace.
        </p>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-xs text-charcoal-400">Loading form...</div>}>
        <SellForm />
      </Suspense>
    </div>
  );
}
