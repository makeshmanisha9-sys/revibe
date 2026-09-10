'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Donation } from '@/types/database';
import { dataStore } from '@/lib/supabase/client';
import { DonationCard } from '@/components/DonationCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { HeartHandshake, PlusCircle, Search, Filter, Gift } from 'lucide-react';

export default function DonationPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const loadDonations = async () => {
    try {
      const data = await dataStore.getDonations();
      setDonations(data);
    } catch (err) {
      console.error('Failed to load donations', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDonations();
    const handleUpdate = () => loadDonations();
    window.addEventListener('revibe_db_updated', handleUpdate);
    return () => window.removeEventListener('revibe_db_updated', handleUpdate);
  }, []);

  const filteredDonations = donations.filter((d) => {
    const matchesSearch =
      d.material_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === 'All' || d.material_type.toLowerCase().includes(selectedType.toLowerCase());

    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-charcoal-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
            <Gift className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero-Waste Circular Scrap Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-charcoal-900">Donation Hub</h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Donate surplus raw waste materials (plastics, glass, cardboard, textiles) or request batches for local upcycling projects.
          </p>
        </div>

        <Link
          href="/donation/create"
          className="px-5 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-soft transition-all btn-press flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Donate Materials</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white border border-charcoal-200 shadow-soft grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search donations by material, description, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
          />
        </div>

        <div className="md:col-span-4 relative">
          <Filter className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-charcoal-900 font-semibold focus:outline-none focus:border-emerald-600 appearance-none"
          >
            <option value="All">All Material Types</option>
            <option value="Plastic">Plastic Bottles & Caps</option>
            <option value="Cardboard">Cardboard & Paper</option>
            <option value="Glass">Glass Bottles & Jars</option>
            <option value="Fabric">Fabric & Denim Scrap</option>
            <option value="Coconut">Coconut Shells</option>
            <option value="Agricultural waste">Agricultural Waste</option>
            <option value="Finished upcycled products">Finished Products</option>
          </select>
        </div>
      </div>

      {/* Grid or Empty State */}
      {loading ? (
        <LoadingSkeleton count={6} />
      ) : filteredDonations.length === 0 ? (
        <EmptyState
          icon={Gift}
          title="No material donations found"
          description="Be the first donor to list raw waste materials for community crafters!"
          actionText="List Donation Batch"
          actionHref="/donation/create"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((don) => (
            <DonationCard key={don.id} donation={don} onUpdate={loadDonations} />
          ))}
        </div>
      )}
    </div>
  );
}
