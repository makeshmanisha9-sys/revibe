export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AssistantContext {
  currentWaste?: string;
  category?: string;
  budget?: number;
  skillLevel?: string;
  tools?: string[];
  mode?: 'creative' | 'business';
}

export async function askReVIBEAssistant(
  messages: ChatMessage[],
  context?: AssistantContext,
  apiKey?: string
): Promise<string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (apiKey) {
    headers['x-ai-api-key'] = apiKey;
  }

  const response = await fetch('/api/ai/assistant', {
    method: 'POST',
    headers,
    body: JSON.stringify({ messages, context }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error || 'ReVIBE AI Assistant is temporarily unavailable. Please try again.');
  }

  const data = await response.json();
  return data.reply;
}
