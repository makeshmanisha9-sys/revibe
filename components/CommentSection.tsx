'use client';

import React, { useState } from 'react';
import { Comment } from '@/types/database';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { dataStore } from '@/lib/supabase/client';
import { Send, MessageCircle } from 'lucide-react';

interface CommentSectionProps {
  postId: string;
  initialComments: Comment[];
}

export function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const { user, profile, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !user) {
      showToast('Please log in to join the conversation', 'error');
      return;
    }
    if (!commentText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const newComment = await dataStore.addComment(
        postId,
        user.id,
        commentText.trim(),
        profile?.name || 'ReVIBE Creator',
        profile?.avatar_url
      );
      setComments((prev) => [...prev, newComment]);
      setCommentText('');
      showToast('Comment posted! 💬', 'success');
    } catch (e) {
      showToast('Failed to post comment', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-3 pt-2">
      {/* Existing Comments List */}
      <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
        {comments.length === 0 ? (
          <p className="text-[11px] text-charcoal-400 italic py-2 text-center">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="flex items-start gap-2 text-xs">
              <img
                src={
                  c.user?.avatar_url ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                }
                alt="Commenter"
                className="w-6 h-6 rounded-full object-cover mt-0.5"
              />
              <div className="flex-1 bg-charcoal-50 p-2.5 rounded-2xl">
                <span className="font-bold text-charcoal-900 block text-[11px]">
                  {c.user?.name || 'Community Member'}
                </span>
                <p className="text-charcoal-700 mt-0.5 leading-relaxed">{c.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Post Comment Input */}
      <form onSubmit={handleSubmitComment} className="flex items-center gap-2 pt-1">
        <input
          type="text"
          placeholder="Add a comment or question..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-1 px-3 py-2 rounded-xl bg-charcoal-50 border border-charcoal-200 text-xs text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
        />
        <button
          type="submit"
          disabled={!commentText.trim() || isSubmitting}
          className="p-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white transition-colors btn-press"
          aria-label="Submit comment"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
