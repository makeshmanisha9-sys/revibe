'use client';

import React, { useState } from 'react';
import { TutorialVideo } from '@/types/database';
import { Youtube, Play, Clock, ExternalLink, X, Film, Sparkles, Search } from 'lucide-react';

interface TutorialSectionProps {
  tutorials: TutorialVideo[];
  productName?: string;
  materialName?: string;
}

export function TutorialSection({ tutorials, productName, materialName }: TutorialSectionProps) {
  const [activeVideo, setActiveVideo] = useState<TutorialVideo | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  if (!tutorials || tutorials.length === 0) {
    return (
      <div className="p-8 rounded-3xl bg-charcoal-50 border border-charcoal-200 text-center space-y-3">
        <Film className="w-8 h-8 text-charcoal-300 mx-auto" />
        <div>
          <p className="font-bold text-sm text-charcoal-800">Looking for DIY video guides?</p>
          <p className="text-xs text-charcoal-500 mt-1">Search YouTube for step-by-step upcycling masterclasses.</p>
        </div>
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent((materialName || 'waste') + ' ' + (productName || 'DIY upcycling tutorial'))}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold btn-press shadow-soft"
        >
          <Youtube className="w-4 h-4" />
          <span>Search {materialName || 'Waste'} DIY Guides on YouTube</span>
        </a>
      </div>
    );
  }

  const categories = Array.from(new Set(tutorials.map((t) => t.category).filter(Boolean)));
  const filteredTutorials = selectedFilter === 'all'
    ? tutorials
    : tutorials.filter((t) => t.category === selectedFilter);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-charcoal-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <Youtube className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-charcoal-900 flex items-center gap-2">
              <span>Recommended DIY Video Tutorials</span>
              <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-[10px] font-bold">
                {tutorials.length} Videos
              </span>
            </h4>
            <p className="text-[11px] text-charcoal-500">
              Verified step-by-step maker guides for {productName || materialName || 'this waste material'}
            </p>
          </div>
        </div>

        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent((materialName || 'waste') + ' ' + (productName || 'DIY upcycling tutorial step by step'))}`}
          target="_blank"
          rel="noreferrer"
          className="px-3.5 py-1.5 rounded-xl border border-charcoal-200 hover:bg-charcoal-50 text-charcoal-700 hover:text-charcoal-900 text-xs font-bold flex items-center gap-1.5 btn-press transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-red-600" />
          <span>Search YouTube</span>
          <ExternalLink className="w-3 h-3 text-charcoal-400" />
        </a>
      </div>

      {/* Category Filter Chips */}
      {categories.length > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors btn-press ${
              selectedFilter === 'all'
                ? 'bg-charcoal-900 text-white shadow-soft'
                : 'bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200'
            }`}
          >
            All Guides
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors btn-press ${
                selectedFilter === cat
                  ? 'bg-red-600 text-white shadow-soft'
                  : 'bg-charcoal-100 text-charcoal-600 hover:bg-charcoal-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTutorials.map((video) => (
          <div
            key={video.id}
            className="group rounded-3xl bg-white border border-charcoal-200 overflow-hidden shadow-soft hover:shadow-soft-md transition-all flex flex-col justify-between"
          >
            {/* Thumbnail Box */}
            <div className="relative aspect-video w-full overflow-hidden bg-charcoal-900">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              
              {/* Play Overlay Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform btn-press"
                  aria-label={`Watch ${video.title} on YouTube`}
                >
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </a>
              </div>

              {/* Duration Pill */}
              {video.duration && (
                <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-black/80 text-white text-[11px] font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-red-400" />
                  {video.duration}
                </span>
              )}

              {/* Category Badge */}
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
                {video.category}
              </span>
            </div>

            {/* Video Content Details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-charcoal-900 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">
                  {video.title}
                </h5>
                <p className="text-[11px] text-charcoal-500 mt-1 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                  <span>{video.channel}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-charcoal-100 flex items-center justify-between gap-2">
                <span className="text-[10px] text-charcoal-400 uppercase font-mono tracking-wider">
                  DIY Walkthrough
                </span>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs flex items-center gap-1 btn-press transition-colors"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
