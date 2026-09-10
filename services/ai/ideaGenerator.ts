import { Idea, TutorialVideo } from '@/types/database';

export async function generateCreativeIdeas(
  material: string,
  category: string,
  apiKey?: string
): Promise<Idea[]> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (apiKey) {
    headers['x-ai-api-key'] = apiKey;
  }

  const response = await fetch('/api/ai/ideas', {
    method: 'POST',
    headers,
    body: JSON.stringify({ material, category }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || 'Failed to generate upcycling ideas');
  }

  const data = await response.json();
  return data.ideas;
}
