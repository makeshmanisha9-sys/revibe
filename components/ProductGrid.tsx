'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/types/database';
import { ProductCard } from './ProductCard';
import { LoadingSkeleton } from './LoadingSkeleton';
import { EmptyState } from './EmptyState';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

const CATEGORIES = [
  'All',
  'Home Decor',
  'Accessories',
  'Stationery',
  'Fashion',
  'Gifts',
  'Eco Products',
  'Others',
];

export const ProductGrid: React.FC<ProductGridProps> = ({ products, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');

  const filteredProducts = useMemo(() => {
    return products
      .filter((prod) => {
        const matchesSearch =
          prod.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prod.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prod.waste_material.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategory === 'All' || prod.category.toLowerCase() === selectedCategory.toLowerCase();

        const matchesPrice = prod.selling_price <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.selling_price - b.selling_price;
        if (sortBy === 'price-high') return b.selling_price - a.selling_price;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [products, searchTerm, selectedCategory, maxPrice, sortBy]);

  if (loading) {
    return <LoadingSkeleton count={6} />;
  }

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search upcycled products or materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-emerald-300/60 focus:outline-none focus:border-emerald-400"
            />
          </div>

          {/* Category Filter */}
          <div className="md:col-span-4 relative">
            <Filter className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 appearance-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-emerald-950 text-white">
                  Category: {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="md:col-span-3 relative">
            <ArrowUpDown className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400 appearance-none"
            >
              <option value="newest" className="bg-emerald-950 text-white">Sort: Newest First</option>
              <option value="price-low" className="bg-emerald-950 text-white">Sort: Price Low to High</option>
              <option value="price-high" className="bg-emerald-950 text-white">Sort: Price High to Low</option>
            </select>
          </div>
        </div>

        {/* Price Slider */}
        <div className="pt-2 flex items-center gap-4 text-xs">
          <span className="text-emerald-300 font-semibold">Max Price: ₹{maxPrice}</span>
          <input
            type="range"
            min="100"
            max="3000"
            step="50"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          title="🌱 No products found."
          description="Be the first to list a recycled upcycled product in this category!"
          actionText="List a Product Now"
          actionHref="/sell"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
};
