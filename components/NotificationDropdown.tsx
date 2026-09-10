'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Notification } from '@/types/database';
import { dataStore } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Bell, Heart, MessageSquare, ShoppingBag, Gift, Award, Trophy, CheckCheck, X } from 'lucide-react';
import Link from 'next/link';

export function NotificationDropdown() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifs = async () => {
    if (!user) return;
    const notifs = await dataStore.getNotifications(user.id);
    setNotifications(notifs);
  };

  useEffect(() => {
    fetchNotifs();
    const handleUpdate = () => fetchNotifs();
    window.addEventListener('revibe_db_updated', handleUpdate);
    return () => window.removeEventListener('revibe_db_updated', handleUpdate);
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const handleMarkRead = async (id: string) => {
    await dataStore.markNotificationRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
  };

  const handleMarkAllRead = async () => {
    if (!user) return;
    await dataStore.markAllNotificationsRead(user.id);
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />;
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-sky-500" />;
      case 'order_request':
      case 'order_update':
        return <ShoppingBag className="w-4 h-4 text-amber-500" />;
      case 'donation_request':
      case 'donation_accepted':
        return <Gift className="w-4 h-4 text-emerald-500" />;
      case 'badge_unlocked':
        return <Award className="w-4 h-4 text-purple-500" />;
      case 'challenge_completed':
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTargetLink = (n: Notification) => {
    if (n.reference_type === 'post') return '/community';
    if (n.reference_type === 'order') return '/orders';
    if (n.reference_type === 'donation') return '/donation';
    if (n.reference_type === 'challenge') return '/challenges';
    if (n.reference_type === 'badge') return '/profile';
    return '/dashboard';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-charcoal-700 hover:text-charcoal-900 hover:bg-charcoal-100 transition-colors btn-press"
        aria-label="View notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-charcoal-200 shadow-soft-lg z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="p-3.5 border-b border-charcoal-100 flex items-center justify-between bg-charcoal-50/50">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          <div className="max-h-[360px] overflow-y-auto divide-y divide-charcoal-100">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-charcoal-500 space-y-1">
                <Bell className="w-8 h-8 text-charcoal-300 mx-auto" />
                <p className="font-semibold text-charcoal-700">No notifications yet</p>
                <p>Activity on your posts, orders, and donations will show here.</p>
              </div>
            ) : (
              notifications.map((n) => (
                <Link
                  key={n.id}
                  href={getTargetLink(n)}
                  onClick={() => {
                    handleMarkRead(n.id);
                    setIsOpen(false);
                  }}
                  className={`block p-3 hover:bg-charcoal-50/80 transition-colors ${
                    !n.is_read ? 'bg-emerald-50/40' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-charcoal-100/80 flex-shrink-0 mt-0.5">
                      {getIcon(n.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-bold text-charcoal-900 truncate">{n.title}</p>
                        {!n.is_read && <span className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0" />}
                      </div>
                      <p className="text-[11px] text-charcoal-600 line-clamp-2 mt-0.5">{n.message}</p>
                      <span className="text-[9px] text-charcoal-400 mt-1 block">
                        {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
