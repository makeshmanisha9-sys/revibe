import { TransformationStory } from '@/types/database';

export async function generateTransformationStory(
  wasteMaterial: string,
  productName: string,
  beforeImage: string,
  afterImage: string,
  apiKey?: string
): Promise<Omit<TransformationStory, 'id' | 'user_id' | 'created_at'>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (apiKey) {
    headers['x-ai-api-key'] = apiKey;
  }

  const response = await fetch('/api/ai/transform', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      wasteMaterial,
      productName,
      beforeImage,
      afterImage,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || 'Failed to generate transformation story');
  }

  return response.json();
}
