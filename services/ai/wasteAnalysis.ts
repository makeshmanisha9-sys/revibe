export interface AIWasteAnalysisResponse {
  detectedMaterial: string;
  wasteCategory: string;
  confidence: number;
  possibleReusableMaterials: string[];
}

export async function analyzeWasteImage(base64ImageOrUrl: string, customApiKey?: string): Promise<AIWasteAnalysisResponse> {
  const storedKey = typeof window !== 'undefined' ? localStorage.getItem('revibe_user_gemini_key') || '' : '';
  const apiKey = customApiKey || storedKey;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (apiKey) {
    headers['x-ai-api-key'] = apiKey;
  }

  const res = await fetch('/api/ai/analyze', {
    method: 'POST',
    headers,
    body: JSON.stringify({ image: base64ImageOrUrl }),
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data.error || 'AI analysis is temporarily unavailable. Please try again.');
  }

  return data as AIWasteAnalysisResponse;
}
