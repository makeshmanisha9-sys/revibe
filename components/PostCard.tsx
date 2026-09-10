'use client';

import React, { useState } from 'react';
import { Post } from '@/types/database';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { dataStore } from '@/lib/supabase/client';
import { CommentSection } from '@/components/CommentSection';
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Sparkles,
  ArrowRight,
  MoreVertical,
  Trash2,
  Layers,
} from 'lucide-react';

interface PostCardProps {
  post: Post;
  onPostDeleted?: (id: string) => void;
}

export function PostCard({ post, onPostDeleted }: PostCardProps) {
  const { user, profile, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [isLiked, setIsLiked] = useState(Boolean(post.is_liked_by_user));
  const [isSaved, setIsSaved] = useState(Boolean(post.is_saved_by_user));
  const [showComments, setShowComments] = useState(false);
  const [activeView, setActiveView] = useState<'after' | 'before'>('after');

  const handleToggleLike = async () => {
    if (!isAuthenticated || !user) {
      showToast('Please log in to like community posts', 'error');
      return;
    }

    // Optimistic update
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikesCount((prev) => Math.max(0, prev + (nextLiked ? 1 : -1)));

    try {
      await dataStore.toggleLikePost(post.id, user.id, profile?.name);
    } catch (e) {
      // Revert if error
      setIsLiked(!nextLiked);
      setLikesCount((prev) => Math.max(0, prev + (!nextLiked ? 1 : -1)));
    }
  };

  const handleSaveToCollection = async () => {
    if (!isAuthenticated || !user) {
      showToast('Please log in to save to your collection', 'error');
      return;
    }

    try {
      const collections = await dataStore.getCollections(user.id);
      let targetColId = collections[0]?.id;

      if (!targetColId) {
        const newCol = await dataStore.createCollection(user.id, 'Inspiration Board', 'Saved Community Posts');
        targetColId = newCol.id;
      }

      await dataStore.saveItemToCollection(targetColId, {
        item_type: 'post',
        reference_id: post.id,
        title: post.product_name || 'DIY Transformation',
        image_url: post.image_url,
        waste_material: post.waste_material,
      });

      setIsSaved(true);
      showToast('Saved to your Inspiration Collection! 🔖', 'success');
    } catch (e) {
      showToast('Failed to save post', 'error');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `ReVIBE Community: ${post.product_name || 'Upcycled Creation'}`,
          text: post.description,
          url: window.location.href,
        });
      } catch (err) {
        // Ignored
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Post link copied to clipboard! ↗', 'info');
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      await dataStore.deletePost(post.id);
      showToast('Post deleted', 'info');
      if (onPostDeleted) onPostDeleted(post.id);
    }
  };

  const isOwner = user?.id === post.user_id;

  return (
    <div className="rounded-3xl bg-white border border-charcoal-200 overflow-hidden shadow-soft hover:shadow-soft-md transition-all duration-200 space-y-3">
      {/* Post Author Header */}
      <div className="p-4 sm:p-5 pb-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={
              post.user?.avatar_url ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
            }
            alt={post.user?.name || 'User'}
            className="w-9 h-9 rounded-xl object-cover border border-charcoal-200"
          />
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-charcoal-900 leading-tight">
              {post.user?.name || 'ReVIBE Creator'}
            </h4>
            <span className="text-[10px] text-charcoal-400">
              {new Date(post.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>

        {isOwner && (
          <button
            onClick={handleDelete}
            className="p-2 rounded-xl text-charcoal-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="Delete post"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Main Transformation Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-charcoal-950">
        <img
          src={activeView === 'before' && post.before_image_url ? post.before_image_url : post.image_url}
          alt={post.product_name || 'Upcycled post'}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Before / After View Switcher (if Before image exists) */}
        {post.before_image_url && (
          <div className="absolute top-3 left-3 flex gap-1 p-1 rounded-xl bg-black/60 backdrop-blur-md">
            <button
              onClick={() => setActiveView('before')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase transition-colors ${
                activeView === 'before' ? 'bg-amber-500 text-charcoal-950' : 'text-white/80 hover:text-white'
              }`}
            >
              Before
            </button>
            <button
              onClick={() => setActiveView('after')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase transition-colors ${
                activeView === 'after' ? 'bg-emerald-500 text-charcoal-950' : 'text-white/80 hover:text-white'
              }`}
            >
              After
            </button>
          </div>
        )}

        {/* Waste Material Tag */}
        {post.waste_material && (
          <div className="absolute bottom-3 left-3">
            <span className="px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md text-[10px] font-black text-charcoal-900 shadow-soft">
              ♻️ {post.waste_material}
            </span>
          </div>
        )}
      </div>

      {/* Social Interactions Bar */}
      <div className="px-4 sm:px-5 space-y-3 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleToggleLike}
              className={`flex items-center gap-1.5 text-xs font-bold transition-colors btn-press ${
                isLiked ? 'text-rose-600' : 'text-charcoal-700 hover:text-rose-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
              <span>{likesCount}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1.5 text-xs font-bold text-charcoal-700 hover:text-sky-600 transition-colors btn-press"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{post.comments_count || post.comments?.length || 0}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-xl text-charcoal-600 hover:text-charcoal-900 transition-colors btn-press"
              aria-label="Share post"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleSaveToCollection}
            className={`p-1.5 rounded-xl transition-colors btn-press ${
              isSaved ? 'text-emerald-700' : 'text-charcoal-600 hover:text-charcoal-900'
            }`}
            aria-label="Save to Inspiration Collection"
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-emerald-700' : ''}`} />
          </button>
        </div>

        {/* Product & Caption */}
        <div className="space-y-1">
          {post.product_name && (
            <h4 className="text-xs font-black text-charcoal-900">
              {post.product_name}
            </h4>
          )}
          <p className="text-xs text-charcoal-700 leading-relaxed font-normal">
            {post.description}
          </p>
        </div>

        {/* Embedded Real-time Comments Section */}
        {showComments && (
          <div className="pt-2 border-t border-charcoal-100">
            <CommentSection postId={post.id} initialComments={post.comments || []} />
          </div>
        )}
      </div>
    </div>
  );
}
