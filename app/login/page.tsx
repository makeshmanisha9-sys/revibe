'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Recycle, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('eco@revibe.org');
  const [password, setPassword] = useState('password123');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    const success = await login(email);
    setSubmitting(false);

    if (success) {
      showToast('Logged in successfully!', 'success');
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full p-8 rounded-2xl bg-emerald-950/80 border border-emerald-800 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 w-12 h-12 mx-auto flex items-center justify-center">
            <Recycle className="w-6 h-6 animate-spin-slow" />
          </div>
          <h1 className="text-2xl font-black text-white">Welcome Back to ReVIBE</h1>
          <p className="text-xs text-emerald-200/70">Sign in to your waste-to-wealth dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-emerald-200 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="eco@revibe.org"
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block font-bold text-emerald-200 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="p-3 rounded-xl bg-emerald-900/30 border border-emerald-800/60 text-[11px] text-emerald-300/80 space-y-1">
            <p className="font-semibold text-emerald-300">Quick Test Credentials:</p>
            <p>• User login: <code className="text-white">eco@revibe.org</code></p>
            <p>• Admin login: <code className="text-white">admin@revibe.org</code></p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{submitting ? 'Authenticating...' : 'Sign In'}</span>
          </button>
        </form>

        <p className="text-center text-xs text-emerald-300/70">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-emerald-400 font-bold hover:underline">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}
