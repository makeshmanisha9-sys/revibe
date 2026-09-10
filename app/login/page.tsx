'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Recycle, LogIn, Sparkles, Shield, User } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('aanya@revibe.eco');
  const [password, setPassword] = useState('password123');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    const success = await login(email);
    setSubmitting(false);

    if (success) {
      showToast('Logged in successfully! 🌿', 'success');
      router.push('/dashboard');
    }
  };

  const handleQuickLogin = async (roleEmail: string) => {
    setEmail(roleEmail);
    setSubmitting(true);
    const success = await login(roleEmail);
    setSubmitting(false);
    if (success) {
      showToast(`Logged in as ${roleEmail === 'admin@revibe.eco' ? 'Administrator' : 'Aanya Sharma'}!`, 'success');
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-charcoal-200 space-y-6 shadow-soft">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center shadow-xs">
            <Recycle className="w-6 h-6 animate-spin-slow" />
          </div>
          <h1 className="text-2xl font-black text-charcoal-900">Welcome Back to ReVIBE</h1>
          <p className="text-xs text-charcoal-500">Sign in to your waste-to-wealth dashboard & impact portfolio</p>
        </div>

        {/* 1-Click Quick Demo Accounts */}
        <div className="p-3.5 rounded-2xl bg-charcoal-50 border border-charcoal-100 space-y-2 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-400 block">
            Instant Demo Logins (1-Click)
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('aanya@revibe.eco')}
              className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-emerald-50 border border-charcoal-200 text-charcoal-800 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors btn-press shadow-2xs"
            >
              <User className="w-3.5 h-3.5 text-emerald-700" />
              <span>Eco Creator</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin@revibe.eco')}
              className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-rose-50 border border-charcoal-200 text-charcoal-800 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors btn-press shadow-2xs"
            >
              <Shield className="w-3.5 h-3.5 text-rose-600" />
              <span>Administrator</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-charcoal-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aanya@revibe.eco"
              className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-charcoal-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-soft transition-all btn-press disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{submitting ? 'Authenticating...' : 'Sign In'}</span>
          </button>
        </form>

        <p className="text-center text-xs text-charcoal-500">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-emerald-700 font-bold hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
