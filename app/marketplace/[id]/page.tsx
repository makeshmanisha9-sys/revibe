'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Product, Order } from '@/types/database';
import { dataStore } from '@/lib/supabase/client';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import {
  MapPin,
  Tag,
  Heart,
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  User,
  Truck,
  CheckCircle,
  X,
  PhoneCall,
} from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, profile, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Order modal state
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState('Flat 102, Palm Heights, Bengaluru, 560038');
  const [contactPhone, setContactPhone] = useState('+91 98765 43210');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  useEffect(() => {
    async function load() {
      if (params?.id) {
        const item = await dataStore.getProductById(params.id as string);
        setProduct(item);
        if (item) setIsWishlisted(Boolean(item.is_wishlisted));
        setLoading(false);
      }
    }
    load();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-charcoal-500 font-semibold">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-charcoal-900">Product Not Found</h2>
        <p className="text-xs text-charcoal-500">The product listing you are looking for does not exist or has been removed.</p>
        <Link href="/marketplace" className="inline-block px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs btn-press">
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      showToast('Please log in to place an order', 'error');
      router.push('/login');
      return;
    }

    if (!deliveryAddress.trim() || !contactPhone.trim()) {
      showToast('Please provide delivery address and contact phone', 'error');
      return;
    }

    setIsSubmittingOrder(true);
    try {
      const order = await dataStore.createOrder({
        product_id: product.id,
        product,
        buyer_id: user.id,
        buyer: profile || { name: 'Customer' },
        seller_id: product.seller_id,
        seller: product.seller,
        quantity: orderQuantity,
        total_amount: product.selling_price * orderQuantity,
        delivery_address: deliveryAddress,
        contact_phone: contactPhone,
        notes: orderNotes,
      });

      showToast('Order Placed Successfully! Seller notified 🛍️', 'success');
      setShowOrderModal(false);
      router.push('/orders');
    } catch (e) {
      showToast('Failed to place order', 'error');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Button */}
      <Link href="/marketplace" className="inline-flex items-center gap-1.5 text-xs font-bold text-charcoal-600 hover:text-emerald-800">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Marketplace</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white border border-charcoal-200 rounded-3xl p-6 lg:p-10 shadow-soft">
        {/* Large Product Image */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl overflow-hidden aspect-square border border-charcoal-200 bg-charcoal-100">
            <img src={product.image_url} alt={product.product_name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md border border-charcoal-200 text-xs font-black uppercase text-charcoal-900 shadow-sm">
                {product.category}
              </span>
              <span className="px-3 py-1 rounded-xl bg-emerald-700/95 backdrop-blur-md text-xs font-black text-white shadow-sm">
                ♻️ {product.waste_material}
              </span>
            </div>
          </div>
        </div>

        {/* Details & Actions */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Upcycled Craft</span>
              </span>
              <button
                onClick={async () => {
                  const s = await dataStore.toggleWishlist(product.id);
                  setIsWishlisted(s);
                  showToast(s ? 'Added to wishlist ❤️' : 'Removed from wishlist', 'info');
                }}
                className={`p-2.5 rounded-2xl border transition-colors btn-press ${
                  isWishlisted ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-charcoal-50 border-charcoal-200 text-charcoal-600'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-rose-600' : ''}`} />
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-charcoal-900 leading-tight">
              {product.product_name}
            </h1>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-charcoal-400">Price</span>
              <div className="text-3xl font-black text-charcoal-900">₹{product.selling_price}</div>
              <p className="text-xs text-charcoal-500">
                Stock: <strong className="text-charcoal-800">{product.quantity} units available</strong>
              </p>
            </div>

            <p className="text-xs text-charcoal-600 leading-relaxed pt-3 border-t border-charcoal-100">
              {product.description}
            </p>

            {/* Seller Info Card */}
            <div className="p-4 rounded-2xl bg-charcoal-50 border border-charcoal-100 space-y-2 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={product.seller?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt="Seller"
                  className="w-10 h-10 rounded-xl object-cover border border-charcoal-200"
                />
                <div>
                  <p className="font-black text-charcoal-900">{product.seller?.name || 'Aanya Sharma'}</p>
                  <p className="flex items-center gap-1 text-[11px] text-charcoal-500">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{product.location}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-charcoal-100">
            <button
              onClick={() => setShowOrderModal(true)}
              className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-soft transition-all btn-press"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buy / Place Order (₹{product.selling_price})</span>
            </button>

            <button
              onClick={() => showToast(`Seller Direct Contact: ${product.contact_information}`, 'info')}
              className="w-full py-2.5 rounded-xl border border-charcoal-200 hover:bg-charcoal-50 text-charcoal-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Contact Seller Directly</span>
            </button>
          </div>
        </div>
      </div>

      {/* Order Placement Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-charcoal-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-charcoal-100 pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-700" />
                <h3 className="text-base font-black text-charcoal-900">Confirm Upcycled Order</h3>
              </div>
              <button
                onClick={() => setShowOrderModal(false)}
                className="p-1 rounded-xl text-charcoal-400 hover:text-charcoal-800 hover:bg-charcoal-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-charcoal-50 border border-charcoal-100">
                <span className="font-bold text-charcoal-800 truncate">{product.product_name}</span>
                <span className="font-black text-emerald-800">₹{product.selling_price} each</span>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-charcoal-700">Quantity</label>
                <input
                  type="number"
                  min="1"
                  max={product.quantity || 10}
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-charcoal-50 border border-charcoal-200 text-xs font-semibold text-charcoal-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-charcoal-700">Delivery Address</label>
                <textarea
                  rows={2}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Street, City, Postal Code"
                  className="w-full p-2.5 rounded-xl bg-charcoal-50 border border-charcoal-200 text-xs text-charcoal-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-charcoal-700">Contact Phone Number</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-charcoal-50 border border-charcoal-200 text-xs text-charcoal-900"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-900">Total Payable:</span>
                <span className="text-lg font-black text-emerald-950">
                  ₹{product.selling_price * orderQuantity}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  className="flex-1 py-3 rounded-xl border border-charcoal-300 text-charcoal-800 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingOrder}
                  className="flex-1 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-black text-xs btn-press shadow-soft"
                >
                  {isSubmittingOrder ? 'Placing Order...' : 'Confirm Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
