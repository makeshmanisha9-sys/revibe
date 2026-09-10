import { Challenge, ChallengeAttempt } from '@/types/database';

export interface ChallengeRequestParams {
  wasteMaterials: string[];
  quantity?: string;
  budgetInr?: number;
  timeLimitMinutes?: number;
  skillLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  availableTools?: string[];
}

export async function generateChallenge(
  params: ChallengeRequestParams,
  apiKey?: string
): Promise<Challenge> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (apiKey) {
    headers['x-ai-api-key'] = apiKey;
  }

  const response = await fetch('/api/ai/challenge', {
    method: 'POST',
    headers,
    body: JSON.stringify({ action: 'generate', ...params }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || 'Failed to generate upcycling challenge');
  }

  return response.json();
}

export async function evaluateChallengeSubmission(
  challenge: Challenge,
  resultImageBase64: string,
  apiKey?: string
): Promise<ChallengeAttempt['ai_evaluation']> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (apiKey) {
    headers['x-ai-api-key'] = apiKey;
  }

  const response = await fetch('/api/ai/challenge', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      action: 'evaluate',
      challenge,
      resultImage: resultImageBase64,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || 'AI verification failed. Please try again.');
  }

  return response.json();
}
