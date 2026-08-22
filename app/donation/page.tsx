'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Donation } from '@/types/database';
import { dataStore } from '@/lib/supabase/client';
import { DonationCard } from '@/components/DonationCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { HeartHandshake, PlusCircle, Search, Filter } from 'lucide-react';

export default function DonationPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    async function load() {
      try {
        const data = await dataStore.getDonations();
        setDonations(data);
      } catch (err) {
        console.error('Failed to load donations', err);
      } finally {
        setLoading(false);
      }
    }
    load();

    const handleUpdate = () => load();
    window.addEventListener('revibe_db_updated', handleUpdate);
    return () => window.removeEventListener('revibe_db_updated', handleUpdate);
  }, []);

  const filteredDonations = donations.filter((d) => {
    const matchesSearch =
      d.material_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'All' || d.material_type.toLowerCase().includes(selectedType.toLowerCase());

    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero-Waste Circular Sharing</span>
          </div>
          <h1 className="text-3xl font-black text-white">Donation Hub</h1>
          <p className="text-xs text-emerald-200/70 mt-1">
            Donate surplus raw waste materials (plastics, glass, cardboard, denim) or request materials for local upcycling projects.
          </p>
        </div>

        <Link
          href="/donation/create"
          className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Donate Materials</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-800 grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search donations by material, description, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-emerald-300/60 focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="md:col-span-4 relative">
          <Filter className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 appearance-none"
          >
            <option value="All" className="bg-emerald-950">All Materials</option>
            <option value="Plastic" className="bg-emerald-950">Plastic Bottles & Caps</option>
            <option value="Cardboard" className="bg-emerald-950">Cardboard & Paper</option>
            <option value="Glass" className="bg-emerald-950">Glass Bottles & Jars</option>
            <option value="Fabric" className="bg-emerald-950">Fabric & Denim Scrap</option>
            <option value="Coconut" className="bg-emerald-950">Coconut Shells</option>
          </select>
        </div>
      </div>

      {/* Grid or Empty */}
      {loading ? (
        <LoadingSkeleton count={6} />
      ) : filteredDonations.length === 0 ? (
        <EmptyState
          title="🎁 No material donations found."
          description="Be the first donor to list raw waste materials for community crafters!"
          actionText="Create Donation Listing"
          actionHref="/donation/create"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((don) => (
            <DonationCard key={don.id} donation={don} />
          ))}
        </div>
      )}
    </div>
  );
}
