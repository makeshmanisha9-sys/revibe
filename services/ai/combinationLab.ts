import { CombinationLabResult } from '@/types/database';

export async function generateCombinationIdeas(
  materials: string[],
  apiKey?: string
): Promise<CombinationLabResult> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (apiKey) {
    headers['x-ai-api-key'] = apiKey;
  }

  const response = await fetch('/api/ai/combination', {
    method: 'POST',
    headers,
    body: JSON.stringify({ materials }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || 'Failed to synthesize multi-material combination blueprint');
  }

  return response.json();
}
