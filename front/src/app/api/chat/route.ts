import { mistral } from '@ai-sdk/mistral';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: mistral('ministral-3b-latest'),
    messages: messages,
    system: "You are a helpful, direct, and friendly AI assistant. You maintain a natural conversation flow while providing accurate and helpful responses.",
  });

  return result.toTextStreamResponse();
}
