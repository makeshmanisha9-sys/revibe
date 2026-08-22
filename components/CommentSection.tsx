'use client';

import React, { useState } from 'react';
import { Comment } from '@/types/database';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { dataStore } from '@/lib/supabase/client';
import { Send } from 'lucide-react';

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onCommentAdded: () => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ postId, comments, onCommentAdded }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    if (!user) {
      showToast('Please log in to leave a comment', 'info');
      return;
    }

    setSubmitting(true);
    await dataStore.addComment(postId, user.id, commentText.trim(), user.name);
    setCommentText('');
    setSubmitting(false);
    showToast('Comment posted successfully!', 'success');
    onCommentAdded();
  };

  return (
    <div className="space-y-3">
      {/* Existing Comments List */}
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {comments.length === 0 ? (
          <p className="text-[11px] text-emerald-400/60 italic">No comments yet. Be the first to start the discussion!</p>
        ) : (
          comments.map((comm) => (
            <div key={comm.id} className="p-2.5 rounded-xl bg-emerald-900/40 border border-emerald-800/50 text-xs space-y-0.5">
              <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold">
                <span>{comm.user?.name || 'Community Member'}</span>
                <span className="text-emerald-500/70">{new Date(comm.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <p className="text-emerald-100 text-xs">{comm.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2 border-t border-emerald-900/40">
        <input
          type="text"
          placeholder="Write an encouraging comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-1 bg-emerald-900/60 border border-emerald-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-emerald-400/60 focus:outline-none focus:border-emerald-400"
        />
        <button
          type="submit"
          disabled={submitting || !commentText.trim()}
          className="p-2 rounded-xl bg-emerald-500 text-emerald-950 hover:bg-emerald-400 font-bold text-xs disabled:opacity-50 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
