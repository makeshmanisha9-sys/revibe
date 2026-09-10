'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { dataStore } from '@/lib/supabase/client';
import { Order, OrderStatus } from '@/types/database';
import { EmptyState } from '@/components/EmptyState';
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  Box,
  MapPin,
  Phone,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'purchases' | 'sales'>('purchases');

  const loadOrders = async () => {
    if (!user) return;
    try {
      const data = await dataStore.getOrders(user.id);
      setOrders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    const handleUpdate = () => loadOrders();
    window.addEventListener('revibe_db_updated', handleUpdate);
    return () => window.removeEventListener('revibe_db_updated', handleUpdate);
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-black text-charcoal-900">Please Log In</h2>
        <p className="text-xs text-charcoal-500">Log in to track your upcycled product orders and sales status.</p>
        <Link href="/login" className="inline-block px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs">
          Log In
        </Link>
      </div>
    );
  }

  const handleUpdateStatus = async (orderId: string, nextStatus: OrderStatus) => {
    try {
      await dataStore.updateOrderStatus(orderId, nextStatus, `Updated by user`);
      showToast(`Order status updated to ${nextStatus.toUpperCase()}! 📦`, 'success');
      loadOrders();
    } catch (e) {
      showToast('Failed to update status', 'error');
    }
  };

  const myPurchases = orders.filter((o) => o.buyer_id === user?.id);
  const mySales = orders.filter((o) => o.seller_id === user?.id);
  const displayOrders = activeTab === 'purchases' ? myPurchases : mySales;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">Delivered</span>;
      case 'ready':
        return <span className="px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 text-[10px] font-black uppercase">Ready for Pickup</span>;
      case 'preparing':
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-black uppercase">Preparing</span>;
      case 'accepted':
        return <span className="px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 text-[10px] font-black uppercase">Accepted</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-charcoal-100 text-charcoal-800 text-[10px] font-black uppercase">Pending</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-charcoal-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
            <span>Circular Order Workflow</span>
          </div>
          <h1 className="text-3xl font-black text-charcoal-900">Orders & Purchases</h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Track order status progression in real-time from confirmation to handcrafted packaging and handover.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="p-1 rounded-2xl bg-charcoal-100 flex gap-1 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('purchases')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'purchases' ? 'bg-white text-charcoal-900 shadow-xs' : 'text-charcoal-600'
            }`}
          >
            My Purchases ({myPurchases.length})
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'sales' ? 'bg-white text-charcoal-900 shadow-xs' : 'text-charcoal-600'
            }`}
          >
            My Sales ({mySales.length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      {displayOrders.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title={activeTab === 'purchases' ? 'No purchases yet' : 'No incoming orders yet'}
          description={
            activeTab === 'purchases'
              ? 'Explore our upcycled marketplace and place your first sustainable order.'
              : 'List handcrafted products to start receiving customer order requests.'
          }
          actionText={activeTab === 'purchases' ? 'Explore Marketplace' : 'List a Product'}
          actionHref={activeTab === 'purchases' ? '/marketplace' : '/sell'}
        />
      ) : (
        <div className="space-y-4">
          {displayOrders.map((order) => (
            <div
              key={order.id}
              className="p-6 rounded-3xl bg-white border border-charcoal-200 shadow-soft space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-charcoal-400">#{order.id}</span>
                  {getStatusBadge(order.status)}
                  <span className="text-xs text-charcoal-400">
                    {new Date(order.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="text-base font-black text-charcoal-900">
                  Total: ₹{order.total_amount} <span className="text-xs text-charcoal-500 font-normal">({order.quantity} pcs)</span>
                </div>
              </div>

              {/* Order Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-wider block">Product</span>
                  <h4 className="font-bold text-charcoal-900">{order.product?.product_name || 'Upcycled Creation'}</h4>
                  <p className="text-charcoal-500">Category: {order.product?.category || 'Decor'}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-wider block">Delivery & Contact</span>
                  <p className="text-charcoal-700 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{order.delivery_address}</span>
                  </p>
                  <p className="text-charcoal-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-charcoal-400" />
                    <span>{order.contact_phone}</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-wider block">Seller / Buyer</span>
                  <p className="text-charcoal-800 font-semibold">
                    {activeTab === 'purchases' ? `Seller: ${order.seller?.name || 'Eco Creator'}` : `Buyer: ${order.buyer?.name || 'Customer'}`}
                  </p>
                  {order.notes && <p className="text-charcoal-500 italic">Note: "{order.notes}"</p>}
                </div>
              </div>

              {/* Status Progression Controls for Seller */}
              {activeTab === 'sales' && (
                <div className="pt-3 border-t border-charcoal-100 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-charcoal-500 font-semibold">Update Order Status:</span>
                  <div className="flex gap-2">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'accepted')}
                        className="px-3.5 py-1.5 rounded-xl bg-sky-700 text-white font-bold text-xs btn-press"
                      >
                        Accept Order
                      </button>
                    )}
                    {order.status === 'accepted' && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'preparing')}
                        className="px-3.5 py-1.5 rounded-xl bg-amber-700 text-white font-bold text-xs btn-press"
                      >
                        Mark Preparing
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'ready')}
                        className="px-3.5 py-1.5 rounded-xl bg-teal-700 text-white font-bold text-xs btn-press"
                      >
                        Mark Ready
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'completed')}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-700 text-white font-bold text-xs btn-press"
                      >
                        Mark Completed / Handed Over
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
