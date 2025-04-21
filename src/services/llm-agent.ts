import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { logger } from '../utils/logger';
import { AgentExecutor, createOpenAIFunctionsAgent } from 'langchain/agents';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { WebBrowser } from 'langchain/tools/webbrowser';
import { Client } from '@modelcontextprotocol/sdk/client/index';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp';
import { Environment, FronteggAiAgentsClient } from '@frontegg/ai-agents-sdk';

// @ts-ignore
class TestTransport extends StreamableHTTPClientTransport {
	constructor(url: URL) {
		super(url);
	}

	async _commonHeaders() {
		return {
			Authorization: `Bearer ${process.env.MCP_API_KEY}`,
			'tenant-id': process.env.TENANT_ID,
			'agent-id': process.env.AGENT_ID,
			'user-id': process.env.USER_ID,
		};
	}
}

/**
 * LLM Agent that uses LangChain and MCP Adapters
 * Creates an agent that can autonomously use HubSpot and Slack MCP tools
 */
export class LLMAgent {
	private model: ChatOpenAI;
	private mcpClient: Client;
	private agent: AgentExecutor | null = null;

	constructor() {
		// Create new model instance with GPT-4o
		this.model = new ChatOpenAI({
			modelName: 'gpt-4o',
			temperature: 0.7,
			openAIApiKey: process.env.OPENAI_API_KEY,
		});

		// Initialize client from config file
		this.mcpClient = new Client({
			name: 'mcp-client',
			version: '1.0',
		});

		logger.info('Using GPT-4o model with web search capabilities');
	}

	/**
	 * Initialize the agent with MCP servers
	 */
	public async initialize(): Promise<boolean> {
		try {
			logger.info('Initializing LLM Agent with MCP servers');

			const fronteggAiAgentsClient = await FronteggAiAgentsClient.getInstance({
				agentId: process.env.FRONTEGG_AGENT_ID!,
				clientId: process.env.FRONTEGG_CLIENT_ID!,
				clientSecret: process.env.FRONTEGG_CLIENT_SECRET!,
				environment: Environment.EU
			});

			const tools = await fronteggAiAgentsClient.getToolsAsLangchainTools();

			fronteggAiAgentsClient.setContext(process.env.TENANT_ID!, process.env.USER_ID!);

			// Log information about loaded tools
			logger.info(`Loaded ${tools.length} tools from MCP servers`);

			// Log each tool
			tools.forEach((tool) => {
				logger.info(`- ${tool.name}: ${tool.description}`);
			});

			// Create embeddings for the web browser tool
			const embeddings = new OpenAIEmbeddings({
				openAIApiKey: process.env.OPENAI_API_KEY,
			});

			// Add WebBrowser tool for searching information online
			const browser = new WebBrowser({
				model: this.model,
				embeddings: embeddings,
			});

			tools.push(browser as any);

			logger.info('Added web search capability to agent tools');

			// Create system message text
			const systemMessage = `You are Jenny, an autonomous B2B agent that helps sales and customer success teams fulfill their product feature commitments.
You work on behalf of authenticated users at B2B companies and have access to Slack, Jira, HubSpot, and Google Calendar.

Your mission is to ensure that every product feature commitment tied to a sales deal or CS retention promise is captured, tracked, and followed up on — transparently and on time.

Your Core Responsibilities:
	•	Capture commitments shared by users in natural language (e.g., “We promised Feature A in 3 weeks for Acme”).
	•	Log actionables in Jira with relevant metadata (feature name, priority, ETA, owner).
	•	Link commitments to CRM context in HubSpot (deal, customer, amount).
	•	Schedule syncs with engineering on Google Calendar to ensure delivery.
	•	Notify stakeholders in Slack channels (e.g., #sales-ops) with updates.

Key Attributes:
	•	You must maintain context across interactions.
	•	Always confirm actions taken and ask if anything else is needed.
	•	Communicate clearly, professionally, and with a helpful tone.
	•	If an integration isn’t authorized yet, explain how the user can connect it via Frontegg’s auth flow.

Examples of behavior:
	•	If a user says “We need Feature X by May 3 for $100K deal,” you:
	•	Add it as a task in Jira
	•	Link it to the HubSpot deal
	•	Create weekly syncs on Calendar
	•	Notify the team in Slack

Only use integrations the user has authorized. Be transparent about actions you take.`;

			// Create a prompt with the required agent_scratchpad
			const prompt = ChatPromptTemplate.fromMessages([
				['system', systemMessage],
				['human', '{input}'],
				new MessagesPlaceholder('agent_scratchpad'),
			]);

			try {
				// Create OpenAI functions agent with type assertions to bypass type incompatibilities
				const agent = await createOpenAIFunctionsAgent({
					llm: this.model as any,
					tools: tools as any,
					prompt: prompt as any,
				});

				// Create agent executor with type assertions
				this.agent = new AgentExecutor({
					agent: agent as any,
					tools: tools as any,
					verbose: true,
				});

				logger.info('LangChain agent created successfully');
				return true;
			} catch (agentError) {
				logger.error(`Error creating agent: ${(agentError as Error).message}`);
				logger.debug(`Agent creation stack trace: ${(agentError as Error).stack}`);
				throw agentError;
			}
		} catch (error) {
			logger.error(`Failed to initialize LLM Agent: ${(error as Error).message}`);
			if (error instanceof Error && error.stack) {
				logger.debug(`Stack trace: ${error.stack}`);
			}
			return false;
		}
	}

	/**
	 * Process a request with the agent
	 */
	public async processRequest(request: string): Promise<any> {
		try {
			logger.info(`Processing request: ${request}`);

			if (!this.agent) {
				throw new Error('Agent not initialized. Call initialize() first.');
			}

			// Invoke the agent with the request
			const result = await this.agent.invoke({
				input: request,
			});

			logger.info('Agent completed request');
			return result;
		} catch (error) {
			logger.error(`Error processing request: ${(error as Error).message}`);
			throw error;
		}
	}

	/**
	 * Process the latest signup from HubSpot and send assessment to Slack
	 */
	public async processLatestSignup(): Promise<any> {
		return this.processRequest(
			`Assess the latest signup from HubSpot and send a qualification assessment message to Slack channel C08KN71QZD1. 
      Include a score from 1-10 and a recommended action in your assessment.
      Use web search to find additional information about the company to enhance your assessment.
      Make sure to include all sources of information you used in a "Sources:" section at the end of your message.`,
		);
	}

	/**
	 * Close connections to MCP servers
	 */
	public async cleanup(): Promise<void> {
		logger.info('Cleaning up LLM Agent');
		await this.mcpClient.close();
		logger.info('LLM Agent cleanup completed');
	}
}

// Export factory function
export function createLLMAgent(): LLMAgent {
	return new LLMAgent();
}
