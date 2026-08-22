'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Recycle, Menu, X, User, LogOut, ShieldAlert, Sparkles, ShoppingBag, HeartHandshake, Users, LayoutDashboard, Info } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { showToast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
  };

  const navLinks = isAuthenticated
    ? [
        { name: 'Home', href: '/', icon: Recycle },
        { name: 'Upload Waste', href: '/upload', icon: Sparkles },
        { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
        { name: 'Donation Hub', href: '/donation', icon: HeartHandshake },
        { name: 'Community', href: '/community', icon: Users },
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        ...(isAdmin ? [{ name: 'Admin', href: '/admin', icon: ShieldAlert }] : []),
      ]
    : [
        { name: 'Home', href: '/', icon: Recycle },
        { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
        { name: 'Community', href: '/community', icon: Users },
        { name: 'About', href: '/about', icon: Info },
      ];

  return (
    <nav className="sticky top-0 z-40 bg-emerald-950/80 backdrop-blur-md border-b border-emerald-800/40 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 group-hover:bg-emerald-500/30 transition-all">
              <Recycle className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">
                ReVIBE
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest text-emerald-400/80 ml-2">
                Waste to Wealth
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-900/50'
                      : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/40'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-900/60 border border-emerald-700/50 hover:border-emerald-500 transition-all"
                >
                  <img
                    src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt={user?.name}
                    className="w-7 h-7 rounded-full object-cover border border-emerald-400"
                  />
                  <span className="text-xs font-semibold text-emerald-200">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-800/40 text-red-300 hover:bg-red-900/60 transition-all text-xs font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/50 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500 text-emerald-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-900/50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-emerald-950 border-b border-emerald-800/60 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-emerald-600 text-white' : 'text-emerald-100 hover:bg-emerald-900'
                }`}
              >
                <Icon className="w-4 h-4 text-emerald-400" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-emerald-900">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-emerald-200 hover:bg-emerald-900"
                >
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>Profile ({user?.name})</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-300 hover:bg-red-950"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-bold rounded-lg border border-emerald-700 text-emerald-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-xs font-bold rounded-lg bg-emerald-500 text-emerald-950"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
