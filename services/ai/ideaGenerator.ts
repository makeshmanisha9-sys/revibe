import { Idea } from '@/types/database';

export async function generateCreativeIdeas(detectedMaterial: string, wasteCategory: string, customApiKey?: string): Promise<Idea[]> {
  const storedKey = typeof window !== 'undefined' ? localStorage.getItem('revibe_user_gemini_key') || '' : '';
  const apiKey = customApiKey || storedKey;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (apiKey) {
    headers['x-ai-api-key'] = apiKey;
  }

  const res = await fetch('/api/ai/ideas', {
    method: 'POST',
    headers,
    body: JSON.stringify({ detectedMaterial, wasteCategory }),
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data.error || 'AI analysis is temporarily unavailable. Please try again.');
  }

  return data as Idea[];
}
