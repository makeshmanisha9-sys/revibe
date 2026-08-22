'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/database';
import { MapPin, Tag, Heart, ShoppingBag, Eye } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { showToast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    showToast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!', 'success');
  };

  return (
    <div className="group rounded-2xl bg-emerald-950/60 border border-emerald-800/80 overflow-hidden hover:border-emerald-500/60 transition-all flex flex-col justify-between shadow-lg hover:shadow-emerald-500/10">
      <div>
        {/* Product Image & Badges */}
        <div className="relative aspect-video overflow-hidden bg-black/40 border-b border-emerald-900/60">
          <img
            src={product.image_url}
            alt={product.product_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-md bg-emerald-900/90 border border-emerald-700 text-[10px] font-bold uppercase tracking-wider text-emerald-200">
              {product.category}
            </span>
          </div>
          <button
            onClick={toggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
              isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-emerald-950/70 border border-emerald-700/60 text-emerald-200 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
            <Tag className="w-3.5 h-3.5" />
            <span>Material: {product.waste_material}</span>
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
            {product.product_name}
          </h3>

          <p className="text-xs text-emerald-200/70 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-1 text-[11px] text-emerald-300/60">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{product.location}</span>
          </div>
        </div>
      </div>

      {/* Footer Price & Action */}
      <div className="p-5 pt-0 flex items-center justify-between border-t border-emerald-900/40 mt-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-emerald-400">Price</span>
          <p className="text-xl font-black text-white">₹{product.selling_price}</p>
        </div>

        <Link
          href={`/marketplace/${product.id}`}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Product</span>
        </Link>
      </div>
    </div>
  );
};
