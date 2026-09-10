'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, Sparkles, RefreshCw, Check } from 'lucide-react';

interface UploadZoneProps {
  onImageSelected: (base64Image: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const SAMPLE_WASTE_ITEMS = [
  {
    name: 'Clear Glass Bottle',
    category: 'Glass',
    url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    type: 'glass',
  },
  {
    name: 'Plastic PET Bottle',
    category: 'Plastic',
    url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    type: 'plastic',
  },
  {
    name: 'Cardboard Box',
    category: 'Cardboard',
    url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    type: 'cardboard',
  },
  {
    name: 'Denim Fabric Scrap',
    category: 'Textile',
    url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    type: 'fabric',
  },
  {
    name: 'Natural Coconut Shell',
    category: 'Organic',
    url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
    type: 'coconut',
  },
];

export function UploadZone({ onImageSelected, onAnalyze, isAnalyzing }: UploadZoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedSample, setSelectedSample] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      setSelectedSample(null);
      onImageSelected(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleSelectSample = (sample: typeof SAMPLE_WASTE_ITEMS[0]) => {
    setPreview(sample.url);
    setSelectedSample(sample.name);
    onImageSelected(sample.url);
  };

  return (
    <div className="space-y-6">
      {/* Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative p-8 sm:p-12 rounded-3xl border-2 border-dashed transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center space-y-4 ${
          isDragging
            ? 'border-emerald-600 bg-emerald-50/50 scale-[1.01]'
            : preview
            ? 'border-emerald-500/80 bg-white shadow-soft'
            : 'border-charcoal-300 bg-white hover:border-emerald-500 hover:bg-emerald-50/20 shadow-soft'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {preview ? (
          <div className="space-y-4 max-w-sm">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-soft border border-charcoal-200">
              <img src={preview} alt="Selected waste preview" className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-black/70 text-white text-[10px] font-bold flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Ready for AI Scan</span>
              </div>
            </div>
            <p className="text-xs text-charcoal-500">
              Click to replace image or drag another photo here.
            </p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-700 flex items-center justify-center shadow-xs">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-black text-charcoal-900">
                Upload Waste Image
              </h3>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                Drag & drop or click to upload photo of plastic, glass, cardboard, fabric, or coconut waste.
              </p>
            </div>
            <span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-widest">
              JPG, PNG, WebP up to 10MB
            </span>
          </>
        )}
      </div>

      {/* Preset Waste Items for Instant 1-Click Evaluation */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-charcoal-500">
            Or Test With Sample Reusable Waste
          </span>
          <span className="text-[11px] text-charcoal-400">1-click selection</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {SAMPLE_WASTE_ITEMS.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => handleSelectSample(item)}
              className={`p-2 rounded-2xl border text-left transition-all btn-press flex items-center gap-2.5 ${
                selectedSample === item.name
                  ? 'bg-emerald-50 border-emerald-600 shadow-xs ring-1 ring-emerald-600'
                  : 'bg-white border-charcoal-200 hover:border-emerald-300 shadow-soft'
              }`}
            >
              <img src={item.url} alt={item.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-charcoal-900 block truncate">{item.name}</span>
                <span className="text-[9px] text-emerald-700 font-semibold">{item.category}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Analyze Trigger Button */}
      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={onAnalyze}
          disabled={!preview || isAnalyzing}
          className="w-full sm:w-auto min-w-[240px] py-3.5 px-8 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-extrabold text-sm shadow-soft transition-all btn-press inline-flex items-center justify-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Waste with Vision AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Run AI Waste Analysis</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
