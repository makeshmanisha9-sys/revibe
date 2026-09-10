'use client';

import React, { useEffect, useState } from 'react';
import { Post } from '@/types/database';
import { dataStore } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { PostCard } from '@/components/PostCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { Users, PlusCircle, Sparkles, Send, Image as ImageIcon, Camera } from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
  const { user, profile, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [wasteMaterial, setWasteMaterial] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80');
  const [beforeImageUrl, setBeforeImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadPosts = async () => {
    try {
      const data = await dataStore.getPosts();
      setPosts(data);
    } catch (err) {
      console.error('Failed to load posts', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
    const handleUpdate = () => loadPosts();
    window.addEventListener('revibe_db_updated', handleUpdate);
    return () => window.removeEventListener('revibe_db_updated', handleUpdate);
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !imageUrl) {
      showToast('Please provide a caption and image URL.', 'error');
      return;
    }
    if (!isAuthenticated || !user) {
      showToast('Please log in to post to community feed.', 'info');
      return;
    }

    setSubmitting(true);
    try {
      await dataStore.createPost({
        user_id: user.id,
        user: {
          id: user.id,
          name: profile?.name || 'ReVIBE Creator',
          avatar_url: profile?.avatar_url,
        },
        product_name: productName || undefined,
        description,
        waste_material: wasteMaterial || undefined,
        image_url: imageUrl,
        before_image_url: beforeImageUrl || undefined,
      });

      showToast('Post published to community feed! +30 Eco Points 🌿', 'success');
      setShowCreateModal(false);
      setProductName('');
      setDescription('');
      setWasteMaterial('');
      setBeforeImageUrl('');
      loadPosts();
    } catch (err) {
      showToast('Failed to create post. Try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-charcoal-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Circular Maker Community</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-charcoal-900">Upcycling Feed</h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Share your transformation stories, discover creative DIY hacks, like, comment, and save ideas to your inspiration collection.
          </p>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <Link
            href="/transformations"
            className="px-4 py-2.5 rounded-2xl border border-charcoal-300 hover:bg-charcoal-50 text-charcoal-800 font-bold text-xs btn-press"
          >
            Before/After Story
          </Link>
          <button
            onClick={() => setShowCreateModal(!showCreateModal)}
            className="px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-2 shadow-soft transition-all btn-press"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Post</span>
          </button>
        </div>
      </div>

      {/* Post Creation Modal / Box */}
      {showCreateModal && (
        <form
          onSubmit={handleCreatePost}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-charcoal-200 space-y-4 shadow-soft-md animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between border-b border-charcoal-100 pb-3">
            <h3 className="text-sm font-black text-charcoal-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Share Your Upcycling Transformation</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
              +30 Eco Points
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <input
              type="text"
              placeholder="Product Name (e.g. Denim Pocket Organizer)"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="bg-charcoal-50 border border-charcoal-200 rounded-xl px-3.5 py-2 text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
            <input
              type="text"
              placeholder="Waste Material Used (e.g. Old Jeans Fabric)"
              value={wasteMaterial}
              onChange={(e) => setWasteMaterial(e.target.value)}
              className="bg-charcoal-50 border border-charcoal-200 rounded-xl px-3.5 py-2 text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          <textarea
            required
            rows={3}
            placeholder="Write a caption describing your DIY process, tools, and eco benefits..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl p-3 text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-emerald-600 focus:bg-white"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-charcoal-700 mb-1">Finished Creation Image URL *</label>
              <input
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-3 py-2 text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal-700 mb-1">Before / Raw Waste Image URL (Optional)</label>
              <input
                type="url"
                placeholder="https://..."
                value={beforeImageUrl}
                onChange={(e) => setBeforeImageUrl(e.target.value)}
                className="w-full bg-charcoal-50 border border-charcoal-200 rounded-xl px-3 py-2 text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-charcoal-600 hover:bg-charcoal-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-black text-xs btn-press shadow-soft flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Publishing...' : 'Publish to Feed'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Community Feed List */}
      {loading ? (
        <LoadingSkeleton count={3} />
      ) : posts.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No community posts yet"
          description="Be the first to share an upcycled transformation story with the community!"
          actionText="Share Creation"
          onAction={() => setShowCreateModal(true)}
        />
      ) : (
        <div className="space-y-6 max-w-2xl mx-auto">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onPostDeleted={loadPosts} />
          ))}
        </div>
      )}
    </div>
  );
}
