import { NextResponse } from 'next/server';
import { ChatOpenAI } from '@langchain/openai';
import { createLLMAgent } from '@/services/llm-agent';

// Create a singleton instance of the agent to reuse across requests
let agent: any = null;

async function getAgent() {
  if (!agent) {
    const model = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.7,
    });
    agent = createLLMAgent(model);
    await agent.initialize();
  }
  return agent;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    const agent = await getAgent();
    const result = await agent.processRequest(message);

    // Extract the text content from the response
    const responseText = typeof result === 'string' 
      ? result 
      : result.output || result.content || JSON.stringify(result);

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error('Error processing message:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process message' },
      { status: 500 }
    );
  }
} 