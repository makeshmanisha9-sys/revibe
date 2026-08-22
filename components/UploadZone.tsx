'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface UploadZoneProps {
  onImageSelected: (base64Image: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onImageSelected, onAnalyze, isAnalyzing }) => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const validateAndProcessFile = (file: File) => {
    setErrorMsg(null);

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      const err = 'Invalid file type. Please upload JPG, JPEG, PNG, or WEBP images.';
      setErrorMsg(err);
      showToast(err, 'error');
      return;
    }

    const maxSizeMb = 5;
    if (file.size > maxSizeMb * 1024 * 1024) {
      const err = `File size exceeds ${maxSizeMb}MB limit.`;
      setErrorMsg(err);
      showToast(err, 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setImagePreview(base64);
      onImageSelected(base64);
      showToast('Image uploaded successfully! Ready for AI analysis.', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    setImagePreview(null);
    setErrorMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    showToast('Image removed.', 'info');
  };

  return (
    <div className="w-full space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {!imagePreview ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all flex flex-col items-center justify-center space-y-4 ${
            dragActive
              ? 'border-emerald-400 bg-emerald-900/40 scale-[1.01]'
              : 'border-emerald-800/80 bg-emerald-950/60 hover:border-emerald-500 hover:bg-emerald-900/30'
          }`}
        >
          <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <p className="text-base font-bold text-white">
              Drag & Drop Waste Image or <span className="text-emerald-400 underline">Browse File</span>
            </p>
            <p className="text-xs text-emerald-200/60 mt-1">
              Supports JPG, JPEG, PNG, WEBP (Max 5MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-emerald-800 bg-emerald-950/80 p-6 space-y-6">
          <div className="relative rounded-xl overflow-hidden max-h-80 border border-emerald-700/60 flex items-center justify-center bg-black/40">
            <img src={imagePreview} alt="Waste preview" className="max-h-80 w-auto object-contain" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-900/60 border border-emerald-700 text-xs font-semibold text-emerald-200 hover:bg-emerald-800 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Replace Image</span>
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-950/60 border border-red-800 text-xs font-semibold text-red-300 hover:bg-red-900 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>

            <button
              type="button"
              disabled={isAnalyzing}
              onClick={onAnalyze}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>{isAnalyzing ? 'Analyzing your waste...' : 'Run AI Waste Analysis'}</span>
            </button>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
