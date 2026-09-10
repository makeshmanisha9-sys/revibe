'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { dataStore } from '@/lib/supabase/client';
import { Donation } from '@/types/database';
import { Gift, PlusCircle, Lock, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CreateDonationPage() {
  const router = useRouter();
  const { user, profile, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [materialName, setMaterialName] = useState('');
  const [materialType, setMaterialType] = useState<Donation['material_type']>('Cardboard');
  const [quantity, setQuantity] = useState('');
  const [condition, setCondition] = useState<Donation['condition']>('Clean Scrap');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80');
  const [location, setLocation] = useState(profile?.location || 'Bengaluru, India');
  const [contactInfo, setContactInfo] = useState(profile?.email || 'donations@revibe.eco | Available for pickup');
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-charcoal-200 text-center space-y-4 shadow-soft">
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 w-14 h-14 mx-auto flex items-center justify-center">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-charcoal-900">Authentication Required</h2>
          <p className="text-xs text-charcoal-500">
            Please log in or register to list raw waste materials for community donation.
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
    if (!materialName || !quantity || !description || !location || !contactInfo) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await dataStore.createDonation({
        donor_id: user?.id || 'demo-user-1',
        donor: {
          id: user?.id,
          name: profile?.name || 'Aanya Sharma',
          location,
          avatar_url: profile?.avatar_url,
        },
        material_name: materialName,
        material_type: materialType,
        quantity,
        condition,
        description,
        image_url: imageUrl,
        location,
        contact_information: contactInfo,
      });

      showToast('Donation listed successfully! +40 Eco Points 🎁', 'success');
      router.push('/donation');
    } catch (e) {
      showToast('Failed to create donation listing', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Gift className="w-3.5 h-3.5 text-emerald-600" />
          <span>Zero-Waste Redistribution</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-charcoal-900">List Material Donation</h1>
        <p className="text-xs sm:text-sm text-charcoal-500">
          Offer your clean surplus waste or finished upcycled items to crafters, schools, and NGOs for creative reuse.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-white border border-charcoal-200 space-y-6 shadow-soft">
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-charcoal-700 mb-1">Material / Batch Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Clean Double-Wall Corrugated Cardboard Boxes"
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
              className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-charcoal-700 mb-1">Material Type *</label>
              <select
                value={materialType}
                onChange={(e: any) => setMaterialType(e.target.value)}
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-charcoal-900 font-semibold focus:outline-none focus:border-emerald-600"
              >
                <option value="Plastic">Plastic</option>
                <option value="Newspaper">Newspaper</option>
                <option value="Cardboard">Cardboard</option>
                <option value="Fabric">Fabric</option>
                <option value="Glass">Glass</option>
                <option value="Coconut shells">Coconut shells</option>
                <option value="Agricultural waste">Agricultural waste</option>
                <option value="Finished upcycled products">Finished upcycled products</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-charcoal-700 mb-1">Condition *</label>
              <select
                value={condition}
                onChange={(e: any) => setCondition(e.target.value)}
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-charcoal-900 font-semibold focus:outline-none focus:border-emerald-600"
              >
                <option value="Clean Scrap">Clean Scrap</option>
                <option value="Washed / Sterilized">Washed / Sterilized</option>
                <option value="Gently Used">Gently Used</option>
                <option value="Brand New">Brand New</option>
                <option value="Raw Waste">Raw Waste</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-charcoal-700 mb-1">Quantity Batch *</label>
              <input
                type="text"
                required
                placeholder="e.g. 25 kg batch (15 boxes) or 40 bottles"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal-700 mb-1">Image URL *</label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-charcoal-700 mb-1">Description & Pickup Guidelines *</label>
            <textarea
              required
              rows={3}
              placeholder="Describe the material condition, suitability for DIY, and pickup hours..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-charcoal-700 mb-1">Location *</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal-700 mb-1">Contact Details *</label>
              <input
                type="text"
                required
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-soft transition-all btn-press"
        >
          <Gift className="w-4 h-4" />
          <span>{submitting ? 'Publishing Listing...' : 'Publish Donation Listing (+40 Eco Points)'}</span>
        </button>
      </form>
    </div>
  );
}
