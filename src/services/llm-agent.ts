import { ChatOpenAI } from '@langchain/openai';
import { logger } from '../utils/logger';
import { AgentExecutor, createOpenAIFunctionsAgent } from 'langchain/agents';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { Environment, FronteggAiClient } from '@frontegg/ai-sdk';

/**
 * LLM Agent that uses OpenAI and Frontegg AI SDK
 * Creates an agent that can autonomously use tools provided by Frontegg AI SDK to get the user context and 3rd party integrations such as Slack, Jira, HubSpot, Google Calendar
 */
export class LLMAgent {
	private model: ChatOpenAI;
	private agent: AgentExecutor | null = null;
	private conversationHistory: { role: string; content: string }[] = [];
	private systemMessage: string;
	private fronteggAiClient: FronteggAiClient | undefined;

	constructor() {
		// Create new model instance with GPT-4o
		this.model = new ChatOpenAI({
			model: 'gpt-4o',
			temperature: 0.7,
			openAIApiKey: process.env.OPENAI_API_KEY,
		});

		// Store system message for reuse
		this.systemMessage = `You are Jenny, an autonomous B2B agent that helps sales and customer success teams fulfill their product feature commitments.
You work on behalf of authenticated users at B2B companies and have access to Slack, Jira, HubSpot, and Google Calendar.

Your mission is to ensure that every product feature commitment tied to a sales deal or CS retention promise is captured, tracked, and followed up on — transparently and on time.

Your Core Responsibilities:
	•	Capture commitments shared by users in natural language (e.g., "We promised Feature A in 3 weeks for Acme").
	•	Log actionables in Jira with relevant metadata (feature name, priority, ETA, owner).
	•	Link commitments to CRM context in HubSpot (deal, customer, amount).
	•	Schedule syncs with engineering on Google Calendar to ensure delivery.
	•	Notify stakeholders in Slack channels (e.g., #sales-ops) with updates.

Key Attributes:
	•	You must maintain context across interactions.
	•	Always confirm actions taken and ask if anything else is needed.
	•	Communicate clearly, professionally, and with a helpful tone.
	•	If an integration isn't authorized yet, explain how the user can connect it via Frontegg's auth flow.

Example:
	•	If a user says "We need Feature X by May 3 for $100K deal," you:
		•	Add it as a task in Jira
		•	Link it to the HubSpot deal
		•	Create weekly syncs on Calendar
		•	Notify the team in Slack

Only use integrations the user has authorized. Be transparent about actions you take.`;
	}

	/**
	 * Initialize the frontegg ai agents client
	 */
	public async initializeFronteggAIAgentsClient(): Promise<boolean> {
		try {
			this.fronteggAiClient = await FronteggAiClient.getInstance({
				agentId: process.env.VITE_FRONTEGG_AGENT_ID!,
				clientId: process.env.VITE_FRONTEGG_CLIENT_ID!,
				clientSecret: process.env.FRONTEGG_CLIENT_SECRET!,
				environment: Environment.EU,
			});
			return true;

		} catch (error) {
			logger.error(`Failed to initialize LLM Agent: ${(error as Error).message}`);
			if (error instanceof Error && error.stack) {
				logger.debug(`Stack trace: ${error.stack}`);
			}
			return false;
		}
	}

	/**
	 * Create or recreate the agent with updated conversation history
	 */
	private async 	createAgent(tools: any[]) {
		try {
			// Create messages array for the prompt
			const messages = [
				{
					role: 'system',
					content: this.systemMessage
				},
				...this.conversationHistory,
				new MessagesPlaceholder('agent_scratchpad'),
			];

			// Create prompt with conversation history
			const prompt = ChatPromptTemplate.fromMessages(messages);

			// Create OpenAI functions agent with type assertions
			const openAIFunctionsAgent = await createOpenAIFunctionsAgent({
				llm: this.model as any,
				tools: tools as any,
				prompt: prompt as any,
			});

			// Create agent executor
			this.agent = new AgentExecutor({
				agent: openAIFunctionsAgent as any,
				tools: tools as any,
				verbose: true,
			});

			logger.info('LangChain agent created/updated successfully');
		} catch (error) {
			logger.error(`Error creating/updating agent: ${(error as Error).message}`);
			throw error;
		}
	}

	/**
	 * Process a request with the agent
	 */
	public async processRequest(request: string, userJwt: string | null, history?: { role: string; content: string }[]): Promise<any> {
		try {
			logger.info(`Processing request: ${request}`);
			logger.debug(`Conversation history length: ${history?.length || 0}`);

			if (!userJwt) {
				throw new Error('User is not authenticated');
			}

			if (!this.fronteggAiClient) {
				throw new Error('Frontegg client not initialized');
			}

			// Update conversation history if provided
			if (history) {
				this.conversationHistory = history;
				logger.debug('Updated conversation history', { historyLength: history.length });
			}

			// Add the new user message to history
			this.conversationHistory.push({ role: 'human', content: request });

			// Recreate the agent with updated user context,tools and history
			await this.fronteggAiClient.setUserContextByJWT(userJwt);
			const tools = await this.fronteggAiClient.getToolsAsLangchainTools();
			await this.createAgent(tools);

			// Invoke the agent with the request
			const result = await this.agent?.invoke({
				input: request,
			});

			// Add the assistant's response to history
			this.conversationHistory.push({ role: 'assistant', content: result?.output || '' });

			logger.info('Agent completed request');
			return result;
		} catch (error) {
			logger.error(`Error processing request: ${(error as Error).message}`);
			throw error;
		}
	}
}

// Export factory function
export function createLLMAgent(): LLMAgent {
	return new LLMAgent();
}
