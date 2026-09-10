import { BusinessAnalysisResult } from '@/types/database';

export async function generateBusinessAnalysis(
  material: string,
  category: string,
  apiKey?: string
): Promise<BusinessAnalysisResult> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (apiKey) {
    headers['x-ai-api-key'] = apiKey;
  }

  const response = await fetch('/api/ai/business', {
    method: 'POST',
    headers,
    body: JSON.stringify({ material, category }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || 'Failed to generate business analysis');
  }

  const data = await response.json();
  return data;
}
