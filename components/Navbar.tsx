'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { NotificationDropdown } from '@/components/NotificationDropdown';
import {
  Recycle,
  Sparkles,
  ShoppingBag,
  Gift,
  Users,
  Compass,
  PlusCircle,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Shield,
  Trophy,
  Layers,
  Flame,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { user, profile, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/upload', label: 'Analyze Waste', icon: Sparkles, badge: 'AI' },
    { href: '/combination-lab', label: 'Mix Waste', icon: Layers },
    { href: '/challenges', label: 'Challenges', icon: Trophy },
    { href: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
    { href: '/donation', label: 'Donations', icon: Gift },
    { href: '/community', label: 'Community', icon: Users },
    { href: '/inspiration', label: 'Inspiration', icon: Compass },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-charcoal-200 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
              <Recycle className="w-6 h-6 animate-spin-slow" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-charcoal-900 leading-none">
                Re<span className="text-emerald-700">VIBE</span>
              </span>
              <span className="text-[10px] font-semibold text-charcoal-500 uppercase tracking-widest leading-none mt-1">
                Waste to Wealth
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? 'text-emerald-800 bg-emerald-50/80 shadow-xs'
                      : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-charcoal-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-charcoal-400'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-700 text-white text-[9px] font-extrabold tracking-wider">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated && (
              <>
                {/* Live Eco Score Pill */}
                <Link
                  href="/dashboard"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors"
                  title="Your ReVIBE Eco Score"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{profile?.eco_points || 340} pts</span>
                </Link>

                {/* Notifications Dropdown */}
                <NotificationDropdown />
              </>
            )}

            {/* Quick Action: Sell / Upload Button */}
            <Link
              href="/sell"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-900 text-xs font-bold transition-colors btn-press"
            >
              <PlusCircle className="w-4 h-4 text-emerald-700" />
              <span>Sell Product</span>
            </Link>

            {/* User Profile / Auth Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-charcoal-100 transition-colors btn-press"
                  aria-label="User menu"
                >
                  <img
                    src={
                      profile?.avatar_url ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                    }
                    alt={profile?.name || 'User avatar'}
                    className="w-8 h-8 rounded-xl object-cover border border-emerald-600/30"
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-charcoal-200 shadow-soft-lg z-50 overflow-hidden py-1.5 text-xs animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2.5 border-b border-charcoal-100 bg-charcoal-50/60">
                      <p className="font-bold text-charcoal-900 truncate">{profile?.name || 'Eco Creator'}</p>
                      <p className="text-[11px] text-charcoal-500 truncate">{profile?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {profile?.role === 'admin' ? '🛡️ Administrator' : '🌱 Eco Creator'}
                      </span>
                    </div>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 px-4 py-2 text-charcoal-700 hover:bg-charcoal-50 hover:text-charcoal-900"
                    >
                      <LayoutDashboard className="w-4 h-4 text-charcoal-400" />
                      <span>Dashboard & Stats</span>
                    </Link>

                    <Link
                      href="/profile"
                      className="flex items-center gap-2.5 px-4 py-2 text-charcoal-700 hover:bg-charcoal-50 hover:text-charcoal-900"
                    >
                      <User className="w-4 h-4 text-charcoal-400" />
                      <span>My Profile & Badges</span>
                    </Link>

                    <Link
                      href="/orders"
                      className="flex items-center gap-2.5 px-4 py-2 text-charcoal-700 hover:bg-charcoal-50 hover:text-charcoal-900"
                    >
                      <ShoppingBag className="w-4 h-4 text-charcoal-400" />
                      <span>Orders & Sales</span>
                    </Link>

                    {profile?.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2.5 px-4 py-2 text-emerald-800 hover:bg-emerald-50 font-bold"
                      >
                        <Shield className="w-4 h-4 text-emerald-600" />
                        <span>Admin Moderation</span>
                      </Link>
                    )}

                    <div className="border-t border-charcoal-100 my-1" />

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-600 hover:bg-rose-50 text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-charcoal-700 hover:text-charcoal-900 hover:bg-charcoal-100 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors btn-press shadow-soft"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-charcoal-700 hover:bg-charcoal-100 transition-colors btn-press"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-charcoal-200 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`p-3 rounded-2xl text-xs font-bold flex items-center gap-2.5 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-charcoal-50 text-charcoal-800 hover:bg-charcoal-100'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-700" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 flex gap-2">
            <Link
              href="/sell"
              className="flex-1 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold text-center"
            >
              Sell Product
            </Link>
            <Link
              href="/donation/create"
              className="flex-1 py-2.5 rounded-xl border border-charcoal-300 text-charcoal-800 text-xs font-bold text-center"
            >
              Donate Waste
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
