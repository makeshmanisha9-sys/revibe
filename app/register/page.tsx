'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Recycle, UserPlus, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    if (!agreeTerms) {
      showToast('Please agree to terms and sustainable community guidelines', 'error');
      return;
    }

    setSubmitting(true);
    const success = await register(name, email);
    setSubmitting(false);

    if (success) {
      showToast('Registration successful! +50 Starting Eco Points awarded 🌿', 'success');
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
          <h1 className="text-2xl font-black text-charcoal-900">Join ReVIBE</h1>
          <p className="text-xs text-charcoal-500">Create an account to track waste reuse & impact</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-charcoal-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aanya Sharma"
              className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-charcoal-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aanya@example.com"
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
              placeholder="••••••••"
              className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-4 py-2.5 text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded border-charcoal-300 text-emerald-700 focus:ring-emerald-600"
            />
            <label htmlFor="terms" className="text-[11px] text-charcoal-600">
              I agree to the Circular Community Terms & LCA sustainability guidelines
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-soft transition-all btn-press disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            <span>{submitting ? 'Creating Account...' : 'Create Account (+50 Eco Points)'}</span>
          </button>
        </form>

        <p className="text-center text-xs text-charcoal-500">
          Already have an account?{' '}
          <Link href="/login" className="text-emerald-700 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
