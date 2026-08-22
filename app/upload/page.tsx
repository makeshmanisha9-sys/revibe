'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { UploadZone } from '@/components/UploadZone';
import { AIAnalysisCard } from '@/components/AIAnalysisCard';
import { IdeaCard } from '@/components/IdeaCard';
import { BusinessAnalysisCard } from '@/components/BusinessAnalysisCard';
import { ProfitCalculator } from '@/components/ProfitCalculator';
import { analyzeWasteImage, AIWasteAnalysisResponse } from '@/services/ai/wasteAnalysis';
import { generateCreativeIdeas } from '@/services/ai/ideaGenerator';
import { generateBusinessAnalysis } from '@/services/ai/businessAnalysis';
import { Idea, BusinessAnalysisResult } from '@/types/database';
import { Sparkles, AlertCircle, RefreshCw, Lock, Key, ExternalLink, Check, Play } from 'lucide-react';
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
  const [errorState, setErrorState] = useState<string | null>(null);

  // Gemini API Key management
  const [userApiKey, setUserApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('revibe_user_gemini_key') || '';
    setUserApiKey(savedKey);
  }, []);

  const saveApiKey = (key: string) => {
    setUserApiKey(key);
    localStorage.setItem('revibe_user_gemini_key', key);
    showToast('Gemini API Key saved!', 'success');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-center space-y-4">
          <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-14 h-14 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Authentication Required</h2>
          <p className="text-xs text-emerald-200/70">
            Please log in or create an account to access AI waste image analysis and upcycling generators.
          </p>
          <div className="pt-2 flex gap-3">
            <Link href="/login" className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-emerald-950 font-bold text-xs">
              Log In
            </Link>
            <Link href="/register" className="flex-1 py-2.5 rounded-xl border border-emerald-700 text-emerald-200 font-bold text-xs">
              Register
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
    showToast('Analyzing your waste image with Gemini AI...', 'info');

    try {
      // 1. Vision AI Analysis via Server API Route
      const analysis = await analyzeWasteImage(selectedImage, userApiKey);
      setAnalysisResult(analysis);

      // 2. Generate initial mode content
      if (activeMode === 'creative') {
        const ideas = await generateCreativeIdeas(analysis.detectedMaterial, analysis.wasteCategory, userApiKey);
        setCreativeIdeas(ideas);
      } else {
        const biz = await generateBusinessAnalysis(analysis.detectedMaterial, analysis.wasteCategory, userApiKey);
        setBusinessData(biz);
      }

      showToast('AI Analysis Complete!', 'success');
    } catch (err: any) {
      console.error('Analysis failed:', err);
      const msg = 'AI analysis is temporarily unavailable. Please try again.';
      setErrorState(msg);
      showToast(msg, 'error');
      setShowKeyInput(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRunDemoAnalysis = () => {
    setIsAnalyzing(true);
    setErrorState(null);
    showToast('Running explicit Demo AI Analysis...', 'info');

    setTimeout(() => {
      const demoAnalysis: AIWasteAnalysisResponse = {
        detectedMaterial: 'Plastic Bottle',
        wasteCategory: 'Plastic Waste',
        confidence: 95,
        possibleReusableMaterials: ['PET Plastic Body', 'Plastic Cap', 'Polypropylene Ring'],
      };

      const demoIdeas: Idea[] = [
        {
          id: 'demo-idea-1',
          product_name: 'Plastic Bottle Ambient Table Lamp',
          description: 'Transform recycled PET bottles into a stylish geometric ambient table lamp with warm LED illumination.',
          difficulty: 'Medium',
          materials: ['1x Clean Plastic Bottle', 'Warm LED String Light', 'Decorative Jute Rope', 'Eco-friendly Glue'],
          tools: ['Scissors', 'Craft Knife', 'Sandpaper'],
          instructions: [
            'Clean and thoroughly dry the plastic bottle.',
            'Carefully slice off the top neck section using a craft knife.',
            'Smooth down the cut edge using sandpaper.',
            'Wrap jute rope around the base for an organic texture.',
            'Insert the LED string light assembly inside and test illumination.'
          ],
          estimated_time: '1.5 - 2 hours',
          cost: 80,
          selling_price: 300,
          profit: 220,
        },
        {
          id: 'demo-idea-2',
          product_name: 'Self-Watering Hanging Planter Pod',
          description: 'Repurpose plastic bottles into sub-irrigated vertical planters for herbs and succulents.',
          difficulty: 'Easy',
          materials: ['Plastic Bottle', 'Cotton Wick', 'Potting Soil', 'Hemp String'],
          tools: ['Scissors', 'Hole Punch'],
          instructions: [
            'Cut the plastic bottle in half horizontally.',
            'Invert the top neck into the bottom reservoir base.',
            'Thread a cotton wick through the bottle cap hole into water base.',
            'Fill top with soil and plant your seeds or herbs.'
          ],
          estimated_time: '30 minutes',
          cost: 30,
          selling_price: 150,
          profit: 120,
        }
      ];

      const demoBusiness: BusinessAnalysisResult = {
        production_cost: 80,
        additional_cost: 40,
        suggested_selling_price: 300,
        estimated_profit: 180,
        profit_margin: 60.0,
        market_demand: 'High',
        potential_buyers: ['Eco-conscious Homeowners', 'Boutique Gift Stores', 'Interior Decorators'],
        product_ideas: demoIdeas,
      };

      setAnalysisResult(demoAnalysis);
      setCreativeIdeas(demoIdeas);
      setBusinessData(demoBusiness);
      setIsAnalyzing(false);
      showToast('Demo AI Analysis Loaded Successfully!', 'success');
    }, 1000);
  };

  const handleModeSwitch = async (mode: 'creative' | 'business') => {
    setActiveMode(mode);
    if (!analysisResult) return;

    if (creativeIdeas.length > 0 && mode === 'creative') return;
    if (businessData && mode === 'business') return;

    setIsAnalyzing(true);
    try {
      if (mode === 'creative') {
        const ideas = await generateCreativeIdeas(analysisResult.detectedMaterial, analysisResult.wasteCategory, userApiKey);
        setCreativeIdeas(ideas);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Multimodal Vision AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Upload & Analyze Waste</h1>
        <p className="text-xs sm:text-sm text-emerald-200/70">
          Upload an image of plastic, glass, cardboard, fabric, or coconut waste to receive instant AI material classification and upcycling workflows.
        </p>

        <button
          onClick={() => setShowKeyInput(!showKeyInput)}
          className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold pt-1"
        >
          <Key className="w-3.5 h-3.5" />
          <span>{userApiKey ? 'Gemini API Key Configured ✓' : 'Configure Gemini API Key'}</span>
        </button>
      </div>

      {/* Optional Gemini API Key Bar */}
      {showKeyInput && (
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-emerald-900/60 border border-emerald-700/80 space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-400" />
              <span>Google Gemini AI API Key</span>
            </h4>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Get Free Key from Google</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-xs text-emerald-200/70">
            Enter your Google Gemini API key below to run live computer vision analysis, or set <code className="text-white">AI_API_KEY</code> in <code className="text-white">.env.local</code>.
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              placeholder="AIzaSy..."
              value={userApiKey}
              onChange={(e) => setUserApiKey(e.target.value)}
              className="flex-1 bg-emerald-950 border border-emerald-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
            />
            <button
              onClick={() => {
                saveApiKey(userApiKey);
                setShowKeyInput(false);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Key</span>
            </button>
          </div>
        </div>
      )}

      {/* Upload Zone */}
      <div className="max-w-3xl mx-auto space-y-4">
        <UploadZone
          onImageSelected={(img) => setSelectedImage(img)}
          onAnalyze={handleRunAnalysis}
          isAnalyzing={isAnalyzing}
        />

        {/* Demo Analysis Trigger Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleRunDemoAnalysis}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-900/60 border border-emerald-700 text-emerald-200 hover:bg-emerald-800 text-xs font-bold transition-all"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span>Test Waste Flow (Demo AI Analysis Mode)</span>
          </button>
        </div>
      </div>

      {/* Error State Banner */}
      {errorState && (
        <div className="max-w-3xl mx-auto p-5 rounded-2xl bg-red-950/90 border border-red-800 text-red-100 text-sm space-y-4 shadow-xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="font-bold text-base">{errorState}</span>
            </div>
            <button
              onClick={handleRunAnalysis}
              className="px-4 py-1.5 rounded-lg bg-red-900 hover:bg-red-800 text-xs font-bold flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>

          <div className="pt-3 border-t border-red-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-red-200/80">
              No API key set? Enter a key above or try the explicit demo scan.
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowKeyInput(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-900 border border-emerald-700 text-emerald-200 font-bold hover:bg-emerald-800"
              >
                + Add API Key
              </button>
              <button
                onClick={handleRunDemoAnalysis}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 text-emerald-950 font-bold hover:bg-emerald-400"
              >
                Run Demo Scan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis Results Section */}
      {analysisResult && (
        <div className="space-y-10 pt-4">
          <div className="max-w-3xl mx-auto">
            <AIAnalysisCard
              analysis={analysisResult}
              activeMode={activeMode}
              onModeChange={handleModeSwitch}
            />
          </div>

          {/* Mode Display Content */}
          {activeMode === 'creative' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
                <h3 className="text-xl font-extrabold text-white">🎨 Creative DIY Upcycling Ideas</h3>
                <span className="text-xs text-emerald-400 font-semibold">{creativeIdeas.length} Product Tutorials</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {creativeIdeas.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-emerald-800/80 pb-3">
                <h3 className="text-xl font-extrabold text-white">💰 Business Valuation & Market Analysis</h3>
                <span className="text-xs text-emerald-400 font-semibold">Commercial Feasibility</span>
              </div>

              {businessData && <BusinessAnalysisCard business={businessData} />}

              {/* Real-time Profit Calculator */}
              <ProfitCalculator
                initialMaterialCost={businessData?.production_cost || 40}
                initialAdditionalCost={businessData?.additional_cost || 40}
                initialSellingPrice={businessData?.suggested_selling_price || 300}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
