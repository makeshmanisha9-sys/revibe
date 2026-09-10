'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { UploadZone } from '@/components/UploadZone';
import { AIAnalysisCard } from '@/components/AIAnalysisCard';
import { IdeaCard } from '@/components/IdeaCard';
import { BusinessAnalysisCard } from '@/components/BusinessAnalysisCard';
import { ProfitCalculator } from '@/components/ProfitCalculator';
import { TutorialSection } from '@/components/TutorialSection';
import { analyzeWasteImage, AIWasteAnalysisResponse } from '@/services/ai/wasteAnalysis';
import { generateCreativeIdeas } from '@/services/ai/ideaGenerator';
import { generateBusinessAnalysis } from '@/services/ai/businessAnalysis';
import { fetchTutorialRecommendations } from '@/services/youtube';
import { dataStore } from '@/lib/supabase/client';
import { Idea, BusinessAnalysisResult, TutorialVideo } from '@/types/database';
import { Sparkles, AlertCircle, RefreshCw, Lock, Key, ExternalLink, Check, Play, ShieldAlert, ArrowRight, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function UploadPage() {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIWasteAnalysisResponse | null>(null);
  const [activeMode, setActiveMode] = useState<'creative' | 'business'>('creative');
  const [creativeIdeas, setCreativeIdeas] = useState<Idea[]>([]);
  const [businessData, setBusinessData] = useState<BusinessAnalysisResult | null>(null);
  const [recommendedTutorials, setRecommendedTutorials] = useState<TutorialVideo[]>([]);
  const [errorState, setErrorState] = useState<string | null>(null);

  // Optional Gemini API Key configuration
  const [userApiKey, setUserApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('revibe_user_gemini_key') || '';
    setUserApiKey(savedKey);
  }, []);

  const saveApiKey = (key: string) => {
    setUserApiKey(key);
    localStorage.setItem('revibe_user_gemini_key', key);
    showToast('Gemini API Key configured! ✓', 'success');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-white border border-charcoal-200 text-center space-y-4 shadow-soft">
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 w-14 h-14 mx-auto flex items-center justify-center">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-charcoal-900">Authentication Required</h2>
          <p className="text-xs text-charcoal-500 leading-relaxed">
            Please log in or create an account to access AI waste identification, Waste DNA extraction, and personalized upcycling generators.
          </p>
          <div className="pt-3 flex gap-3">
            <Link href="/login" className="flex-1 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs btn-press">
              Log In
            </Link>
            <Link href="/register" className="flex-1 py-3 rounded-xl border border-charcoal-300 text-charcoal-800 font-bold text-xs btn-press">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleRunAnalysis = async () => {
    if (!selectedImage) {
      showToast('Please select or upload an image first', 'error');
      return;
    }

    setIsAnalyzing(true);
    setErrorState(null);
    showToast('Analyzing your waste image with Vision AI...', 'info');

    try {
      // 1. Vision AI Analysis
      const analysis = await analyzeWasteImage(selectedImage, userApiKey);
      setAnalysisResult(analysis);

      // Save to user history in persistent database
      if (user) {
        await dataStore.saveAnalysis({
          user_id: user.id,
          image_url: selectedImage,
          detected_material: analysis.detectedMaterial,
          waste_category: analysis.wasteCategory,
          confidence: analysis.confidence,
          possible_reusable_materials: analysis.possibleReusableMaterials,
          waste_dna: analysis.wasteDNA,
          rescue_score: analysis.rescueScore,
        });
      }

      // 2. Generate initial mode content & YouTube DIY video recommendations
      const [ideas, tutorials] = await Promise.all([
        generateCreativeIdeas(analysis.detectedMaterial, analysis.wasteCategory, userApiKey),
        fetchTutorialRecommendations(analysis.detectedMaterial, analysis.possibleReusableMaterials?.[0] || 'DIY Upcycling', 'creative'),
      ]);
      setCreativeIdeas(ideas);
      setRecommendedTutorials(tutorials);

      if (activeMode === 'business') {
        const biz = await generateBusinessAnalysis(analysis.detectedMaterial, analysis.wasteCategory, userApiKey);
        setBusinessData(biz);
      }

      showToast('AI Waste Analysis Complete! +20 Eco Points', 'success');
    } catch (err: any) {
      console.error('Analysis failed:', err);
      const msg = 'AI analysis is temporarily unavailable. Please try again.';
      setErrorState(msg);
      showToast(msg, 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleModeSwitch = async (mode: 'creative' | 'business') => {
    setActiveMode(mode);
    if (!analysisResult) return;

    if (creativeIdeas.length > 0 && mode === 'creative') return;
    if (businessData && mode === 'business') return;

    setIsAnalyzing(true);
    try {
      if (mode === 'creative') {
        const [ideas, tutorials] = await Promise.all([
          generateCreativeIdeas(analysisResult.detectedMaterial, analysisResult.wasteCategory, userApiKey),
          recommendedTutorials.length === 0
            ? fetchTutorialRecommendations(analysisResult.detectedMaterial, analysisResult.possibleReusableMaterials?.[0] || 'DIY Upcycling', 'creative')
            : Promise.resolve(recommendedTutorials),
        ]);
        setCreativeIdeas(ideas);
        if (tutorials.length > 0) setRecommendedTutorials(tutorials);
      } else {
        const biz = await generateBusinessAnalysis(analysisResult.detectedMaterial, analysisResult.wasteCategory, userApiKey);
        setBusinessData(biz);
      }
    } catch (err: any) {
      const msg = 'AI analysis is temporarily unavailable. Please try again.';
      setErrorState(msg);
      showToast(msg, 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Multimodal Vision AI Scanner</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-charcoal-900">Upload & Analyze Waste</h1>
        <p className="text-xs sm:text-sm text-charcoal-500">
          Upload any photo of discarded plastic, glass, cardboard, fabric, or organic waste to extract its Waste DNA, Rescue Score, and upcycling opportunities.
        </p>

        <button
          onClick={() => setShowKeyInput(!showKeyInput)}
          className="inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-800 font-semibold pt-1"
        >
          <Key className="w-3.5 h-3.5" />
          <span>{userApiKey ? 'Gemini API Key Configured ✓' : 'Configure Custom Gemini API Key'}</span>
        </button>
      </div>

      {/* Optional Gemini API Key Bar */}
      {showKeyInput && (
        <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-white border border-charcoal-200 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900 flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-700" />
              <span>Google Gemini Vision API Key (Optional)</span>
            </h4>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <span>Get Free Key</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-xs text-charcoal-500">
            Enter your free Google Gemini API key below for custom multimodal inference, or rely on our built-in intelligent engine.
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="AIzaSy..."
              value={userApiKey}
              onChange={(e) => setUserApiKey(e.target.value)}
              className="flex-1 bg-charcoal-50 border border-charcoal-200 rounded-xl px-3.5 py-2 text-xs text-charcoal-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
            />
            <button
              onClick={() => {
                saveApiKey(userApiKey);
                setShowKeyInput(false);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1 btn-press"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>
          </div>
        </div>
      )}

      {/* Upload Zone */}
      <div className="max-w-3xl mx-auto">
        <UploadZone
          onImageSelected={(img) => setSelectedImage(img)}
          onAnalyze={handleRunAnalysis}
          isAnalyzing={isAnalyzing}
        />
      </div>

      {/* Error State Banner */}
      {errorState && (
        <div className="max-w-3xl mx-auto p-5 rounded-3xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-3 shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span className="font-bold text-sm">{errorState}</span>
            </div>
            <button
              onClick={handleRunAnalysis}
              className="px-3.5 py-1.5 rounded-xl bg-rose-200 hover:bg-rose-300 text-rose-950 text-xs font-bold flex items-center gap-1 btn-press"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      )}

      {/* AI Analysis Results Section */}
      {analysisResult && (
        <div className="space-y-8 pt-4">
          <div className="max-w-4xl mx-auto">
            <AIAnalysisCard
              analysis={analysisResult}
              activeMode={activeMode}
              onModeChange={handleModeSwitch}
            />
          </div>

          {/* Mode Specific Results */}
          {activeMode === 'creative' ? (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex items-center justify-between border-b border-charcoal-200 pb-3">
                <h3 className="text-xl font-black text-charcoal-900">🎨 Creative DIY Upcycling Blueprints</h3>
                <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full">
                  {creativeIdeas.length} Personalized Guides
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {creativeIdeas.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8 max-w-6xl mx-auto">
              <div className="flex items-center justify-between border-b border-charcoal-200 pb-3">
                <h3 className="text-xl font-black text-charcoal-900">💰 Commercial Feasibility & Market Valuation</h3>
                <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full">
                  Economic Projections
                </span>
              </div>

              {businessData && <BusinessAnalysisCard business={businessData} />}

              {/* Real-time Profit Calculator */}
              <ProfitCalculator
                initialMaterialCost={businessData?.production_cost || 40}
                initialAdditionalCost={businessData?.additional_cost || 30}
                initialSellingPrice={businessData?.suggested_selling_price || 300}
              />
            </div>
          )}

          {/* Dedicated YouTube DIY Video Tutorials Section */}
          {recommendedTutorials.length > 0 && (
            <div className="max-w-6xl mx-auto pt-4">
              <TutorialSection
                tutorials={recommendedTutorials}
                materialName={analysisResult.detectedMaterial}
                productName={creativeIdeas[0]?.product_name || analysisResult.detectedMaterial}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
