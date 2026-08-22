'use client';

import React, { useState } from 'react';
import { Post } from '@/types/database';
import { Heart, MessageCircle, Trash2, Tag, Recycle, Share2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { dataStore } from '@/lib/supabase/client';
import { CommentSection } from './CommentSection';

interface PostCardProps {
  post: Post;
  onPostUpdated: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onPostUpdated }) => {
  const { user, isAdmin } = useAuth();
  const { showToast } = useToast();
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [isLiked, setIsLiked] = useState(post.is_liked_by_user || false);
  const [showComments, setShowComments] = useState(false);

  const isOwner = user?.id === post.user_id || isAdmin;

  const handleLike = async () => {
    if (!user) {
      showToast('Please log in to like posts', 'info');
      return;
    }
    const result = await dataStore.toggleLikePost(post.id, user.id);
    setIsLiked(result.liked);
    setLikesCount(result.newCount);
    showToast(result.liked ? 'Post liked ❤️' : 'Unliked post', 'info');
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      await dataStore.deletePost(post.id);
      showToast('Post deleted successfully', 'success');
      onPostUpdated();
    }
  };

  return (
    <div className="rounded-2xl bg-emerald-950/60 border border-emerald-800/80 overflow-hidden space-y-4 shadow-xl">
      {/* Header Profile */}
      <div className="p-4 flex items-center justify-between border-b border-emerald-900/60">
        <div className="flex items-center gap-3">
          <img
            src={post.user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
            alt={post.user?.name || 'User'}
            className="w-10 h-10 rounded-full object-cover border border-emerald-400"
          />
          <div>
            <p className="text-sm font-bold text-white">{post.user?.name || 'Eco Innovator'}</p>
            <p className="text-[10px] text-emerald-400/80">
              {new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>

        {isOwner && (
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg bg-red-950/40 border border-red-800/40 text-red-300 hover:bg-red-900 transition-all text-xs"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Post Content */}
      <div className="px-4 space-y-2">
        {post.product_name && (
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Recycle className="w-4 h-4 text-emerald-400" />
            <span>{post.product_name}</span>
          </h3>
        )}

        <p className="text-xs text-emerald-100/90 leading-relaxed">{post.description}</p>

        {post.waste_material && (
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-[10px] font-bold text-emerald-300">
            <Tag className="w-3 h-3 text-emerald-400" />
            <span>Material: {post.waste_material}</span>
          </div>
        )}
      </div>

      {/* Image Showcase */}
      {post.image_url && (
        <div className="relative aspect-video bg-black/40 overflow-hidden border-y border-emerald-900/60">
          <img src={post.image_url} alt="Community upcycling creation" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Actions (Like, Comment count) */}
      <div className="p-4 pt-0 flex items-center justify-between border-t border-emerald-900/40 text-xs">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 font-bold transition-all ${
              isLiked ? 'text-red-400' : 'text-emerald-300 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likesCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 font-bold text-emerald-300 hover:text-white transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>{post.comments?.length || post.comments_count || 0} Comments</span>
          </button>
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            showToast('Post link copied to clipboard!', 'info');
          }}
          className="text-emerald-400 hover:text-white"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Comments Drawer / Feed */}
      {showComments && (
        <div className="p-4 border-t border-emerald-900/60 bg-emerald-950/80">
          <CommentSection postId={post.id} comments={post.comments || []} onCommentAdded={onPostUpdated} />
        </div>
      )}
    </div>
  );
};
