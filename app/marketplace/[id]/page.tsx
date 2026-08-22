'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Product } from '@/types/database';
import { dataStore } from '@/lib/supabase/client';
import { useToast } from '@/context/ToastContext';
import { MapPin, Tag, Heart, PhoneCall, ArrowLeft, ShieldCheck, User } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    async function load() {
      if (params?.id) {
        const item = await dataStore.getProductById(params.id as string);
        setProduct(item);
        setLoading(false);
      }
    }
    load();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-emerald-300">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Product Not Found</h2>
        <p className="text-xs text-emerald-200/70">The product listing you are looking for does not exist or has been removed.</p>
        <Link href="/marketplace" className="inline-block px-5 py-2.5 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-xs">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Back Button */}
      <Link href="/marketplace" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Marketplace</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-emerald-950/80 border border-emerald-800/80 rounded-2xl p-6 lg:p-8 shadow-2xl">
        {/* Large Product Image */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl overflow-hidden aspect-square border border-emerald-700/60 bg-black/40">
            <img src={product.image_url} alt={product.product_name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-lg bg-emerald-900/90 border border-emerald-700 text-xs font-extrabold uppercase text-emerald-300">
                {product.category}
              </span>
            </div>
          </div>
        </div>

        {/* Details & Actions */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold">
                <Tag className="w-4 h-4" />
                <span>Waste: {product.waste_material}</span>
              </span>
              <button
                onClick={() => {
                  setIsWishlisted(!isWishlisted);
                  showToast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!', 'success');
                }}
                className={`p-2 rounded-full border transition-all ${
                  isWishlisted ? 'bg-red-500 text-white border-red-400' : 'bg-emerald-900/50 border-emerald-700 text-emerald-300'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white">{product.product_name}</h1>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-emerald-400">Price</span>
              <p className="text-3xl font-black text-white">₹{product.selling_price}</p>
              <p className="text-xs text-emerald-300/60">Estimated Cost: ₹{product.cost} | Stock: {product.quantity} available</p>
            </div>

            <p className="text-xs text-emerald-200/80 leading-relaxed pt-2 border-t border-emerald-900/60">
              {product.description}
            </p>

            {/* Seller Info */}
            <div className="p-4 rounded-xl bg-emerald-900/40 border border-emerald-800/60 space-y-2 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={product.seller?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt="Seller"
                  className="w-10 h-10 rounded-full object-cover border border-emerald-400"
                />
                <div>
                  <p className="font-bold text-white">{product.seller?.name || 'Verified Eco Seller'}</p>
                  <p className="flex items-center gap-1 text-[11px] text-emerald-300/60">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{product.location}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Action */}
          <div className="space-y-3 pt-4 border-t border-emerald-900/60">
            <button
              onClick={() => showToast(`Seller Contact: ${product.contact_information}`, 'info')}
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Seller / Request Purchase</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
