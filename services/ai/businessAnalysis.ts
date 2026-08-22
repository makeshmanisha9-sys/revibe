import { BusinessAnalysisResult } from '@/types/database';

export async function generateBusinessAnalysis(detectedMaterial: string, wasteCategory: string, customApiKey?: string): Promise<BusinessAnalysisResult> {
  const storedKey = typeof window !== 'undefined' ? localStorage.getItem('revibe_user_gemini_key') || '' : '';
  const apiKey = customApiKey || storedKey;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (apiKey) {
    headers['x-ai-api-key'] = apiKey;
  }

  const res = await fetch('/api/ai/business', {
    method: 'POST',
    headers,
    body: JSON.stringify({ detectedMaterial, wasteCategory }),
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data.error || 'AI analysis is temporarily unavailable. Please try again.');
  }

  return data as BusinessAnalysisResult;
}
