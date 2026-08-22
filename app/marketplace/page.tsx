'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '@/types/database';
import { dataStore } from '@/lib/supabase/client';
import { ProductGrid } from '@/components/ProductGrid';
import Link from 'next/link';
import { ShoppingBag, PlusCircle } from 'lucide-react';

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await dataStore.getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Failed to load marketplace products', err);
      } finally {
        setLoading(false);
      }
    }
    load();

    // Listen for database updates
    const handleUpdate = () => load();
    window.addEventListener('revibe_db_updated', handleUpdate);
    return () => window.removeEventListener('revibe_db_updated', handleUpdate);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
            <span>Recycled Products Store</span>
          </div>
          <h1 className="text-3xl font-black text-white">Upcycled Marketplace</h1>
          <p className="text-xs text-emerald-200/70 mt-1">
            Discover and purchase handcrafted products created entirely from repurposed waste materials.
          </p>
        </div>

        <Link
          href="/sell"
          className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Sell Recycled Product</span>
        </Link>
      </div>

      {/* Grid */}
      <ProductGrid products={products} loading={loading} />
    </div>
  );
}
