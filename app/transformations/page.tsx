'use client';

import React, { useState, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { generateTransformationStory } from '@/services/ai/transformationEvaluator';
import { dataStore } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles, ArrowRight, Camera, Image as ImageIcon, Send, CheckCircle, Flame, Layers } from 'lucide-react';
import Link from 'next/link';

function TransformationsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, profile, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [wasteMaterial, setWasteMaterial] = useState(searchParams.get('material') || 'Glass Bottle');
  const [productName, setProductName] = useState(searchParams.get('name') || 'Ambient LED Bottle Lamp');
  const [beforeImage, setBeforeImage] = useState<string>('https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80');
  const [afterImage, setAfterImage] = useState<string>('https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80');
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyResult, setStoryResult] = useState<any | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleGenerateStory = async () => {
    if (!wasteMaterial || !productName) {
      showToast('Please specify the waste material and created product name', 'error');
      return;
    }

    setIsGenerating(true);
    showToast('AI is crafting your transformation story...', 'info');

    try {
      const data = await generateTransformationStory(
        wasteMaterial,
        productName,
        beforeImage,
        afterImage
      );
      setStoryResult(data);
      showToast('Transformation Story Generated! 🖼️', 'success');
    } catch (e) {
      showToast('Failed to generate transformation story', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublishToCommunity = async () => {
    if (!isAuthenticated || !user) {
      showToast('Please log in to publish to the community', 'error');
      return;
    }

    setIsPublishing(true);
    try {
      const newPost = await dataStore.createPost({
        user_id: user.id,
        user: {
          id: user.id,
          name: profile?.name || 'ReVIBE Creator',
          avatar_url: profile?.avatar_url,
        },
        product_name: productName,
        description: storyResult?.story_text || `Transformed discarded ${wasteMaterial} into a functional ${productName}! ♻️✨`,
        image_url: afterImage,
        before_image_url: beforeImage,
        waste_material: wasteMaterial,
      });

      showToast('Transformation published to Community! +30 Eco Points', 'success');
      router.push('/community');
    } catch (e) {
      showToast('Failed to publish post', 'error');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-900 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>Before / After Transformation Story</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-charcoal-900">
          Document Your Upcycling Journey
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500">
          Pair your raw waste input photo with your final handcrafted creation. AI will synthesize the transformation story to inspire the community.
        </p>
      </div>

      {/* Form Input Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-charcoal-200 shadow-soft max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-700">Source Waste Material</label>
            <input
              type="text"
              value={wasteMaterial}
              onChange={(e) => setWasteMaterial(e.target.value)}
              placeholder="e.g. Discarded Glass Bottle"
              className="w-full p-2.5 rounded-xl bg-charcoal-50 border border-charcoal-200 text-xs font-semibold text-charcoal-900 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-700">Created Upcycled Product</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Ambient LED Bottle Lamp"
              className="w-full p-2.5 rounded-xl bg-charcoal-50 border border-charcoal-200 text-xs font-semibold text-charcoal-900 focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        {/* Before and After Image Upload Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Before */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-700 block">
              01 BEFORE: Raw Waste Image
            </span>
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-charcoal-200 bg-charcoal-100">
              <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
            </div>
            <input
              type="text"
              value={beforeImage}
              onChange={(e) => setBeforeImage(e.target.value)}
              placeholder="Image URL or upload"
              className="w-full p-2 rounded-xl bg-charcoal-50 border border-charcoal-200 text-[11px] text-charcoal-700"
            />
          </div>

          {/* After */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              02 AFTER: Finished Upcycled Product
            </span>
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-emerald-300 bg-charcoal-100">
              <img src={afterImage} alt="After" className="w-full h-full object-cover" />
            </div>
            <input
              type="text"
              value={afterImage}
              onChange={(e) => setAfterImage(e.target.value)}
              placeholder="Image URL or upload"
              className="w-full p-2 rounded-xl bg-charcoal-50 border border-charcoal-200 text-[11px] text-charcoal-700"
            />
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={handleGenerateStory}
            disabled={isGenerating}
            className="w-full sm:w-auto min-w-[260px] py-3.5 px-8 rounded-2xl bg-purple-700 hover:bg-purple-800 disabled:opacity-50 text-white font-black text-xs btn-press shadow-soft inline-flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>Generate Transformation Story</span>
          </button>
        </div>
      </div>

      {/* Generated Story Display & Publish Action */}
      {storyResult && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-charcoal-200 shadow-soft-lg max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="border-b border-charcoal-100 pb-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-700 block">
              Generated Narrative
            </span>
            <h3 className="text-xl font-black text-charcoal-900 mt-1">
              Transformation Narrative: {storyResult.waste_material} → {storyResult.product_name}
            </h3>
            <p className="text-xs text-charcoal-600 mt-2 leading-relaxed italic bg-purple-50/70 p-3.5 rounded-2xl border border-purple-100">
              "{storyResult.story_text}"
            </p>
          </div>

          {/* 4 Story Stages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {storyResult.stages.map((stage: any, idx: number) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-charcoal-50 border border-charcoal-100 space-y-1">
                <span className="text-[10px] font-mono font-bold text-purple-700">{stage.stage}</span>
                <h4 className="text-xs font-bold text-charcoal-900">{stage.title}</h4>
                <p className="text-[11px] text-charcoal-500 leading-snug">{stage.description}</p>
              </div>
            ))}
          </div>

          {/* Action Bar */}
          <div className="pt-2 flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={handlePublishToCommunity}
              disabled={isPublishing}
              className="py-3 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-black text-xs btn-press shadow-soft flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Publish to Community Feed (+30 Eco Points)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TransformationsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-charcoal-400">Loading transformation builder...</div>}>
      <TransformationsContent />
    </Suspense>
  );
}
