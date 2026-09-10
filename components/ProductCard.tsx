'use client';

import React, { useState } from 'react';
import { Product } from '@/types/database';
import { dataStore } from '@/lib/supabase/client';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { Heart, MapPin, Tag, ShoppingBag, ArrowUpRight, Check, Eye } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  onWishlistToggle?: (id: string, wishlisted: boolean) => void;
}

export function ProductCard({ product, onWishlistToggle }: ProductCardProps) {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(Boolean(product.is_wishlisted));

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newState = await dataStore.toggleWishlist(product.id);
    setIsWishlisted(newState);
    if (onWishlistToggle) onWishlistToggle(product.id, newState);
    showToast(newState ? 'Added to your Wishlist ❤️' : 'Removed from Wishlist', 'info');
  };

  return (
    <div className="group relative rounded-3xl bg-white border border-charcoal-200 overflow-hidden shadow-soft hover:shadow-soft-md transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Product Image Header */}
        <div className="relative aspect-square w-full overflow-hidden bg-charcoal-100">
          <img
            src={product.image_url}
            alt={product.product_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-md border border-charcoal-200/60 text-[10px] font-bold text-charcoal-800 shadow-sm">
              {product.category}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-emerald-700/90 backdrop-blur-md text-[10px] font-bold text-white shadow-sm">
              ♻️ {product.waste_material}
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 p-2 rounded-2xl bg-white/90 backdrop-blur-md text-charcoal-600 hover:text-rose-500 shadow-sm transition-colors btn-press"
            aria-label="Wishlist product"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Product Body Content */}
        <div className="p-4 sm:p-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-charcoal-500">
            <span className="flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-charcoal-400 flex-shrink-0" />
              <span className="truncate">{product.location}</span>
            </span>
            <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md text-[10px]">
              {product.quantity > 0 ? `${product.quantity} in stock` : 'Sold out'}
            </span>
          </div>

          <Link href={`/marketplace/${product.id}`} className="block group-hover:text-emerald-800 transition-colors">
            <h3 className="text-sm sm:text-base font-black text-charcoal-900 line-clamp-1">
              {product.product_name}
            </h3>
          </Link>

          <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Pricing & Order Action Bar */}
      <div className="p-4 bg-charcoal-50/60 border-t border-charcoal-100 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block">Price</span>
          <div className="text-base sm:text-lg font-black text-charcoal-900">
            ₹{product.selling_price}
          </div>
        </div>

        <Link
          href={`/marketplace/${product.id}`}
          className="py-2 px-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 btn-press shadow-soft"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Buy / Request</span>
        </Link>
      </div>
    </div>
  );
}
