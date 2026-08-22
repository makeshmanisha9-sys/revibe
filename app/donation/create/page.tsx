'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { dataStore } from '@/lib/supabase/client';
import { HeartHandshake, Lock } from 'lucide-react';
import Link from 'next/link';

export default function CreateDonationPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [materialName, setMaterialName] = useState('');
  const [materialType, setMaterialType] = useState('Plastic Bottles');
  const [quantity, setQuantity] = useState('20 kg');
  const [condition, setCondition] = useState('Clean / Sorted');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80');
  const [location, setLocation] = useState(user?.location || 'Green City, CA');
  const [contactInfo, setContactInfo] = useState(user?.email || 'eco@revibe.org');
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-center space-y-4">
          <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-14 h-14 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Authentication Required</h2>
          <p className="text-xs text-emerald-200/70">
            Please log in to donate waste materials or products.
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
    if (!materialName || !description || !location || !contactInfo) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await dataStore.createDonation({
        donor_id: user?.id || 'demo-user-1',
        donor: {
          name: user?.name,
          location: user?.location,
        },
        material_name: materialName,
        material_type: materialType,
        quantity,
        condition,
        description,
        image_url: imageUrl,
        location,
        contact_information: contactInfo,
        status: 'available',
      });

      showToast('Donation created successfully!', 'success');
      router.push('/donation');
    } catch (err) {
      showToast('Failed to create donation. Try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-white">Donate Reusable Materials</h1>
        <p className="text-xs text-emerald-200/70">Share surplus scrap, cardboard, glass, or plastic with upcyclers and artisans.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-emerald-950/80 border border-emerald-800 space-y-6 shadow-2xl">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-emerald-200 mb-1">Material Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Clean Double-Wall Cardboard Boxes Batch"
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-emerald-200 mb-1">Material Type *</label>
              <select
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
                className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="Plastic Bottles" className="bg-emerald-950">Plastic Bottles</option>
                <option value="Cardboard" className="bg-emerald-950">Cardboard & Paper</option>
                <option value="Glass bottles" className="bg-emerald-950">Glass Bottles</option>
                <option value="Fabric" className="bg-emerald-950">Fabric & Denim</option>
                <option value="Coconut Shells" className="bg-emerald-950">Coconut Shells</option>
                <option value="Scrap Metal" className="bg-emerald-950">Scrap Metal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-200 mb-1">Quantity *</label>
              <input
                type="text"
                required
                placeholder="e.g. 25 kg / 40 pcs"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-200 mb-1">Condition *</label>
              <input
                type="text"
                required
                placeholder="e.g. Washed / Sterilized"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-200 mb-1">Image URL *</label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-200 mb-1">Description *</label>
            <textarea
              required
              rows={3}
              placeholder="Provide details on pickup instructions, batch condition, etc..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400"
            />
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
          <HeartHandshake className="w-4 h-4" />
          <span>{submitting ? 'Publishing Donation...' : 'Publish Donation to Hub'}</span>
        </button>
      </form>
    </div>
  );
}
