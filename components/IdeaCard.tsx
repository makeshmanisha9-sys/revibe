'use client';

import React, { useState } from 'react';
import { Idea } from '@/types/database';
import { useToast } from '@/context/ToastContext';
import { dataStore } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { TutorialSection } from '@/components/TutorialSection';
import { Clock, Hammer, DollarSign, Bookmark, ArrowRight, CheckCircle, ChevronDown, ChevronUp, Share2, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface IdeaCardProps {
  idea: Idea;
}

export function IdeaCard({ idea }: IdeaCardProps) {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'steps' | 'materials' | 'tutorials'>('steps');

  const handleSaveIdea = async () => {
    if (!isAuthenticated || !user) {
      showToast('Please log in to save ideas to your collection', 'error');
      return;
    }

    try {
      const collections = await dataStore.getCollections(user.id);
      let targetColId = collections[0]?.id;

      if (!targetColId) {
        const newCol = await dataStore.createCollection(user.id, 'My Upcycle Ideas', 'Saved from AI Analysis');
        targetColId = newCol.id;
      }

      await dataStore.saveItemToCollection(targetColId, {
        item_type: 'idea',
        reference_id: idea.id,
        title: idea.product_name,
        image_url: idea.image_url || 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
        waste_material: idea.waste_material || 'Upcycled Waste',
      });

      setIsSaved(true);
      showToast('Saved to your Inspiration Collection!', 'success');
    } catch (e) {
      showToast('Failed to save idea', 'error');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `ReVIBE Upcycling: ${idea.product_name}`,
          text: idea.description,
          url: window.location.href,
        });
      } catch (err) {
        // Ignored
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-charcoal-200 overflow-hidden shadow-soft hover:shadow-soft-md transition-all duration-200 flex flex-col justify-between">
      {/* Top Banner & Header */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                idea.difficulty === 'Easy'
                  ? 'bg-emerald-100 text-emerald-800'
                  : idea.difficulty === 'Medium'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {idea.difficulty}
              </span>
              {idea.waste_material && (
                <span className="text-xs text-charcoal-500 font-medium">
                  from {idea.waste_material}
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-black text-charcoal-900 mt-1.5 leading-snug">
              {idea.product_name}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-charcoal-500 hover:text-charcoal-800 hover:bg-charcoal-100 transition-colors btn-press"
              aria-label="Share idea"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleSaveIdea}
              className={`p-2 rounded-xl transition-colors btn-press ${
                isSaved
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-charcoal-500 hover:text-charcoal-800 hover:bg-charcoal-100'
              }`}
              aria-label="Save idea to collection"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-800' : ''}`} />
            </button>
          </div>
        </div>

        <p className="text-xs text-charcoal-600 leading-relaxed font-normal">
          {idea.description}
        </p>

        {/* Quick Specs Bar */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-charcoal-50 border border-charcoal-100 text-center">
          <div>
            <span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-wider block">Time</span>
            <span className="text-xs font-bold text-charcoal-800 mt-0.5 block truncate">{idea.estimated_time}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-wider block">Est. Cost</span>
            <span className="text-xs font-bold text-charcoal-800 mt-0.5 block">₹{idea.cost}</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Est. Value</span>
            <span className="text-xs font-black text-emerald-800 mt-0.5 block">₹{idea.selling_price}</span>
          </div>
        </div>

        {/* Tabs for Details */}
        <div className="border-b border-charcoal-100 flex gap-4 pt-1">
          <button
            onClick={() => setActiveTab('steps')}
            className={`pb-2 text-xs font-bold transition-colors border-b-2 ${
              activeTab === 'steps'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
            }`}
          >
            Instructions ({idea.instructions?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`pb-2 text-xs font-bold transition-colors border-b-2 ${
              activeTab === 'materials'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
            }`}
          >
            Materials & Tools
          </button>
          {idea.tutorials && idea.tutorials.length > 0 && (
            <button
              onClick={() => setActiveTab('tutorials')}
              className={`pb-2 text-xs font-bold transition-colors border-b-2 ${
                activeTab === 'tutorials'
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
              }`}
            >
              Tutorials ({idea.tutorials.length})
            </button>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === 'steps' && (
          <div className="space-y-2.5 pt-1">
            {idea.instructions?.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-charcoal-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="space-y-4 pt-1 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 block mb-1.5">
                Required Materials
              </span>
              <div className="flex flex-wrap gap-1.5">
                {idea.materials?.map((m, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-xl bg-charcoal-100 text-charcoal-700 text-xs">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal-500 block mb-1.5">
                Required Tools
              </span>
              <div className="flex flex-wrap gap-1.5">
                {idea.tools?.map((t, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-xl bg-charcoal-100 text-charcoal-700 text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tutorials' && idea.tutorials && (
          <div className="pt-2">
            <TutorialSection tutorials={idea.tutorials} productName={idea.product_name} />
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-charcoal-50/60 border-t border-charcoal-100 flex items-center justify-between gap-3">
        <Link
          href={`/sell?name=${encodeURIComponent(idea.product_name)}&material=${encodeURIComponent(idea.waste_material || '')}&cost=${idea.cost}&price=${idea.selling_price}`}
          className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold text-center btn-press shadow-soft transition-colors flex items-center justify-center gap-1.5"
        >
          <span>List in Marketplace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <Link
          href={`/transformations?name=${encodeURIComponent(idea.product_name)}&material=${encodeURIComponent(idea.waste_material || '')}`}
          className="py-2.5 px-4 rounded-xl border border-charcoal-300 hover:bg-charcoal-100 text-charcoal-800 text-xs font-bold btn-press transition-colors"
        >
          Post Story
        </Link>
      </div>
    </div>
  );
}
