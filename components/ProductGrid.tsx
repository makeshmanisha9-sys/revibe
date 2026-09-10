'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/types/database';
import { ProductCard } from '@/components/ProductCard';
import { EmptyState } from '@/components/EmptyState';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, ShoppingBag } from 'lucide-react';

interface ProductGridProps {
  initialProducts: Product[];
}

const CATEGORIES = ['All', 'Home Decor', 'Accessories', 'Stationery', 'Fashion', 'Gifts', 'Eco Products', 'Others'];

export function ProductGrid({ initialProducts }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');
  const [maxPrice, setMaxPrice] = useState<number>(2000);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.waste_material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesPrice = p.selling_price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.selling_price - b.selling_price;
      if (sortBy === 'price-high') return b.selling_price - a.selling_price;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [products, searchQuery, selectedCategory, sortBy, maxPrice]);

  return (
    <div className="space-y-6">
      {/* Search & Filter Controls */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white border border-charcoal-200 shadow-soft space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
            <input
              type="text"
              placeholder="Search upcycled products, materials, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal-50 border border-charcoal-200 text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-48">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-charcoal-400" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-charcoal-50 border border-charcoal-200 text-xs text-charcoal-800 font-semibold focus:outline-none focus:border-emerald-600 appearance-none"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all btn-press ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-charcoal-100/80 text-charcoal-700 hover:bg-charcoal-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid Results */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No products matched your criteria"
          description="Try clearing your search query or selecting a different category."
          actionText="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('All');
            setMaxPrice(2000);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
