'use client';

import React, { useEffect, useState } from 'react';
import { Post } from '@/types/database';
import { dataStore } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { PostCard } from '@/components/PostCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { EmptyState } from '@/components/EmptyState';
import { Users, PlusCircle, Image as ImageIcon, Send, Sparkles } from 'lucide-react';

export default function CommunityPage() {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [wasteMaterial, setWasteMaterial] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80');
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
    if (!user) {
      showToast('Please log in to post to community feed.', 'info');
      return;
    }

    setSubmitting(true);
    try {
      await dataStore.createPost({
        user_id: user.id,
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
        },
        product_name: productName || undefined,
        description,
        waste_material: wasteMaterial || undefined,
        image_url: imageUrl,
      });

      showToast('Post published to community feed!', 'success');
      setShowCreateModal(false);
      setProductName('');
      setDescription('');
      setWasteMaterial('');
      loadPosts();
    } catch (err) {
      showToast('Failed to create post. Try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sustainability Community</span>
          </div>
          <h1 className="text-3xl font-black text-white">Upcycling Feed</h1>
          <p className="text-xs text-emerald-200/70 mt-1">
            Share your upcycling transformations, ask questions, like and comment on community creations.
          </p>
        </div>

        {isAuthenticated && (
          <button
            onClick={() => setShowCreateModal(!showCreateModal)}
            className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Community Post</span>
          </button>
        )}
      </div>

      {/* Post Creation Modal / Box */}
      {showCreateModal && (
        <form onSubmit={handleCreatePost} className="p-6 rounded-2xl bg-emerald-950/90 border border-emerald-700/80 space-y-4 shadow-2xl animate-fadeIn">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Share Your Upcycling Story</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <input
              type="text"
              placeholder="Product Name (Optional)"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
            />
            <input
              type="text"
              placeholder="Waste Material Used (Optional)"
              value={wasteMaterial}
              onChange={(e) => setWasteMaterial(e.target.value)}
              className="bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <textarea
            required
            rows={3}
            placeholder="Write an inspiring caption describing how you transformed waste..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl p-3 text-xs text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400"
          />

          <div>
            <label className="block text-xs font-semibold text-emerald-200 mb-1">Creation Image URL *</label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-emerald-900/50 border border-emerald-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-emerald-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Publishing...' : 'Publish Post'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Feed List */}
      {loading ? (
        <LoadingSkeleton count={3} />
      ) : posts.length === 0 ? (
        <EmptyState
          title="📸 No community posts yet."
          description="Be the first to share an upcycled transformation story with the community!"
          actionText="Share Creation"
          actionHref="#"
        />
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onPostUpdated={loadPosts} />
          ))}
        </div>
      )}
    </div>
  );
}
