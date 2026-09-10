'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { generateChallenge, evaluateChallengeSubmission } from '@/services/ai/challengeGenerator';
import { dataStore } from '@/lib/supabase/client';
import { Challenge, ChallengeAttempt } from '@/types/database';
import {
  Trophy,
  Flame,
  Clock,
  DollarSign,
  Award,
  Sparkles,
  Camera,
  UploadCloud,
  CheckCircle,
  Play,
  RotateCcw,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

export default function ChallengesPage() {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(3600);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<ChallengeAttempt['ai_evaluation'] | null>(null);

  // Challenge customization form inputs
  const [wasteMaterial, setWasteMaterial] = useState('Plastic Bottles');
  const [quantity, setQuantity] = useState('2 units');
  const [budgetInr, setBudgetInr] = useState(50);
  const [timeLimit, setTimeLimit] = useState(60);
  const [skillLevel, setSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isTimerRunning && secondsRemaining > 0) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, secondsRemaining]);

  const handleGenerateChallenge = async () => {
    setIsGenerating(true);
    showToast('AI is engineering your custom upcycling challenge...', 'info');

    try {
      const chal = await generateChallenge({
        wasteMaterials: [wasteMaterial],
        quantity,
        budgetInr,
        timeLimitMinutes: timeLimit,
        skillLevel,
      });

      setActiveChallenge(chal);
      setSecondsRemaining(chal.time_limit_minutes * 60);
      setIsTimerRunning(false);
      setEvaluationResult(null);
      setResultImage(null);
      showToast('Challenge ready! Click Start when prepared.', 'success');
    } catch (e) {
      showToast('Failed to generate challenge', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartTimer = () => {
    setIsTimerRunning(true);
    showToast('Timer started! Good luck with your creation! ⏱️', 'info');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResultImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitCreation = async () => {
    if (!resultImage || !activeChallenge) {
      showToast('Please upload a photo of your finished creation', 'error');
      return;
    }

    if (!isAuthenticated || !user) {
      showToast('Please log in to submit and earn verified Eco Points', 'error');
      return;
    }

    setIsEvaluating(true);
    showToast('ReVIBE Multimodal Vision AI is verifying your creation...', 'info');

    try {
      const evalData = await evaluateChallengeSubmission(activeChallenge, resultImage);
      setEvaluationResult(evalData);
      setIsTimerRunning(false);

      if (evalData.passed) {
        await dataStore.recordChallengeAttempt({
          challenge_id: activeChallenge.id,
          user_id: user.id,
          result_image_url: resultImage,
          ai_evaluation: evalData,
          status: 'completed',
        });
        showToast('🏆 Challenge Completed! Points & Badges Awarded!', 'success');
      }
    } catch (e) {
      showToast('Evaluation failed. Please try again.', 'error');
    } finally {
      setIsEvaluating(false);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>Gamified Upcycling Arena</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-charcoal-900">
          🎮 Challenge Me Mode
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-500">
          Put your creative engineering skills to the test with time and budget constraints. Submit finished photos for real AI vision verification.
        </p>
      </div>

      {/* Arena Configuration Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-charcoal-200 shadow-soft max-w-4xl mx-auto space-y-6">
        <div className="border-b border-charcoal-100 pb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
            Configure Your Upcycling Sprint
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-700">Available Waste</label>
            <select
              value={wasteMaterial}
              onChange={(e) => setWasteMaterial(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-charcoal-50 border border-charcoal-200 text-xs font-semibold text-charcoal-900 focus:outline-none focus:border-emerald-600"
            >
              <option value="Plastic Bottles">Plastic Bottles</option>
              <option value="Glass Bottles">Glass Bottles</option>
              <option value="Cardboard Boxes">Cardboard Boxes</option>
              <option value="Denim / Fabric Scraps">Denim / Fabric</option>
              <option value="Coconut Shells">Coconut Shells</option>
              <option value="Aluminum Cans">Aluminum Cans</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-700">Budget Limit (₹)</label>
            <input
              type="number"
              value={budgetInr}
              onChange={(e) => setBudgetInr(Number(e.target.value))}
              className="w-full p-2 rounded-xl bg-charcoal-50 border border-charcoal-200 text-xs font-semibold text-charcoal-900 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-700">Time Limit (Mins)</label>
            <select
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl bg-charcoal-50 border border-charcoal-200 text-xs font-semibold text-charcoal-900 focus:outline-none focus:border-emerald-600"
            >
              <option value="30">30 Minutes</option>
              <option value="45">45 Minutes</option>
              <option value="60">60 Minutes</option>
              <option value="90">90 Minutes</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-700">Skill Level</label>
            <select
              value={skillLevel}
              onChange={(e: any) => setSkillLevel(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-charcoal-50 border border-charcoal-200 text-xs font-semibold text-charcoal-900 focus:outline-none focus:border-emerald-600"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={handleGenerateChallenge}
            disabled={isGenerating}
            className="w-full sm:w-auto min-w-[240px] py-3 px-6 rounded-2xl bg-charcoal-900 hover:bg-charcoal-800 disabled:opacity-50 text-white font-black text-xs btn-press shadow-soft inline-flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Generate Challenge</span>
          </button>
        </div>
      </div>

      {/* Active Challenge Arena UI */}
      {activeChallenge && (
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-charcoal-200 shadow-soft-lg max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-200">
          {/* Header with Countdown Clock */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
            <div className="space-y-1 text-center sm:text-left">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase">
                {activeChallenge.difficulty} • Budget: ≤ ₹{activeChallenge.budget_inr}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-charcoal-900 mt-1">
                {activeChallenge.title}
              </h2>
            </div>

            {/* Big Timer */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white border border-amber-300 text-center shadow-xs">
                <span className="text-[10px] font-bold text-amber-800 uppercase block">Time Remaining</span>
                <div className="text-2xl sm:text-3xl font-mono font-black text-charcoal-900">
                  {formatTime(secondsRemaining)}
                </div>
              </div>

              {!isTimerRunning ? (
                <button
                  onClick={handleStartTimer}
                  className="p-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs btn-press shadow-soft flex items-center gap-1.5"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsTimerRunning(false)}
                  className="p-4 rounded-2xl bg-charcoal-200 hover:bg-charcoal-300 text-charcoal-800 font-bold text-xs btn-press"
                >
                  Pause
                </button>
              )}
            </div>
          </div>

          {/* Instructions & Success Criteria */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
                Challenge Instructions
              </h4>
              <ul className="space-y-2 text-xs text-charcoal-700">
                {activeChallenge.instructions.map((inst, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-charcoal-100 text-charcoal-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{inst}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
                AI Evaluation Success Criteria
              </h4>
              <ul className="space-y-2 text-xs text-charcoal-700">
                {activeChallenge.success_criteria.map((crit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{crit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Upload Finished Product for Verification */}
          <div className="p-6 rounded-2xl bg-charcoal-50 border border-charcoal-200 space-y-4 text-center">
            <h4 className="text-sm font-black text-charcoal-900">
              Submit Finished Creation for AI Vision Verification
            </h4>
            <p className="text-xs text-charcoal-500 max-w-md mx-auto">
              Upload a clear photo of your handcrafted item. The AI will evaluate structural fidelity and craftsmanship before awarding points.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            {resultImage ? (
              <div className="space-y-3">
                <img
                  src={resultImage}
                  alt="Submission"
                  className="w-48 h-48 object-cover rounded-2xl mx-auto border border-charcoal-300 shadow-soft"
                />
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl border border-charcoal-300 text-xs font-bold text-charcoal-700 hover:bg-charcoal-100"
                  >
                    Change Photo
                  </button>
                  <button
                    onClick={handleSubmitCreation}
                    disabled={isEvaluating}
                    className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white text-xs font-black btn-press shadow-soft flex items-center gap-1.5"
                  >
                    {isEvaluating ? (
                      <>
                        <Zap className="w-4 h-4 animate-spin" />
                        <span>Verifying with Vision AI...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Verify & Claim +50 Eco Points</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="py-3 px-6 rounded-2xl bg-white hover:bg-charcoal-100 border border-charcoal-300 text-charcoal-800 font-bold text-xs btn-press inline-flex items-center gap-2 shadow-xs"
              >
                <Camera className="w-4 h-4 text-emerald-700" />
                <span>Upload Finished Product Photo</span>
              </button>
            )}
          </div>

          {/* Verification Celebration Card */}
          {evaluationResult && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white space-y-4 shadow-soft-lg animate-in zoom-in-95 duration-200 text-center">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto text-2xl">
                🏆
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black">CHALLENGE COMPLETED!</h3>
                <p className="text-xs text-emerald-100 max-w-lg mx-auto">
                  {evaluationResult.feedback}
                </p>
              </div>

              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white text-emerald-900 text-xs font-black shadow-sm">
                <span>+{evaluationResult.points_awarded} Eco Points</span>
                <span>•</span>
                <span>Unlocked 🌱 Eco Creator Badge</span>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <Link
                  href="/community"
                  className="px-4 py-2 rounded-xl bg-emerald-900/80 hover:bg-emerald-950 text-white text-xs font-bold btn-press"
                >
                  Share to Community Feed
                </Link>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-bold btn-press"
                >
                  View in Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
