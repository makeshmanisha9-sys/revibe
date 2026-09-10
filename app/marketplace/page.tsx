'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '@/types/database';
import { dataStore } from '@/lib/supabase/client';
import { ProductGrid } from '@/components/ProductGrid';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import Link from 'next/link';
import { ShoppingBag, PlusCircle, Sparkles } from 'lucide-react';

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      const data = await dataStore.getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load marketplace products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    const handleUpdate = () => loadProducts();
    window.addEventListener('revibe_db_updated', handleUpdate);
    return () => window.removeEventListener('revibe_db_updated', handleUpdate);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-charcoal-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Upcycled Products</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-charcoal-900">
            Upcycled Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Discover and purchase handcrafted products created entirely from repurposed municipal and household waste materials.
          </p>
        </div>

        <Link
          href="/sell"
          className="px-5 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-soft transition-all btn-press flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>List Product for Sale</span>
        </Link>
      </div>

      {/* Grid */}
      {loading ? (
        <LoadingSkeleton count={6} />
      ) : (
        <ProductGrid initialProducts={products} />
      )}
    </div>
  );
}
