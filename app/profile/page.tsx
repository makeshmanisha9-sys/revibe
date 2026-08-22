'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { User, MapPin, Mail, Save, Lock } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [location, setLocation] = useState(user?.location || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || '');
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-center space-y-4">
          <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-14 h-14 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Authentication Required</h2>
          <p className="text-xs text-emerald-200/70">
            Please log in to manage your profile details.
          </p>
          <Link href="/login" className="inline-block px-5 py-2.5 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-xs">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const success = await updateProfile({ name, location, bio, avatar_url: avatarUrl });
    setSubmitting(false);
    if (success) {
      showToast('Profile updated successfully!', 'success');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-white">Your Profile</h1>
        <p className="text-xs text-emerald-200/70">Update your public eco bio, location, and avatar.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-emerald-950/80 border border-emerald-800 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-emerald-800/80">
          <img
            src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-emerald-400 shadow-xl"
          />
          <div className="space-y-1 text-center sm:text-left flex-1">
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-xs text-emerald-400 font-semibold">{user.email}</p>
            <span className="inline-block text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Role: {user.role}
            </span>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-emerald-200 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block font-bold text-emerald-200 mb-1">Location</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block font-bold text-emerald-200 mb-1">Avatar Image URL</label>
            <input
              type="url"
              required
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block font-bold text-emerald-200 mb-1">Eco Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{submitting ? 'Saving...' : 'Save Profile Changes'}</span>
        </button>
      </form>
    </div>
  );
}
