import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { loadMcpTools } from '@langchain/mcp-adapters';
import { logger } from '../utils/logger';
import { AgentExecutor, createOpenAIFunctionsAgent } from 'langchain/agents';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { WebBrowser } from 'langchain/tools/webbrowser';
import { Client } from '@modelcontextprotocol/sdk/client/index';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp';

// @ts-ignore
class TestTransport extends StreamableHTTPClientTransport {
	constructor(url: URL) {
		super(url);
	}

	async _commonHeaders() {
		return {
			'Authorization': `Bearer ${process.env.MCP_API_KEY}`,
			'tenant-id': process.env.TENANT_ID,
			'agent-id': process.env.AGENT_ID,
			'user-id': process.env.USER_ID,
		}
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

			const transport = new TestTransport(new URL('http://localhost:3040/mcp/v1'));
			await this.mcpClient.connect(transport);
			const tools = await loadMcpTools('frontegg', this.mcpClient);

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
			const systemMessage = `You are an AI agent that helps assess potential customers.

IMPORTANT: You MUST ALWAYS send Slack messages ONLY to channel ID C08KN71QZD1. 
Never send messages to any other channel under any circumstances.
When using SLACK_SENDS_A_MESSAGE_TO_A_CHANNEL, always set the channel parameter to "C08KN71QZD1".

IMPORTANT: when 'tools/call' method is being called and a response with the following format is received: 
'Oauth consent is needed, please use the relevant provider's oauth flow tool'.
This means that the user is not authenticated and an OAuth tool should be used to authenticate the user.
For example if the request method is 'tools/call' and the name of the the tool is 'providerName_some-action'
then, you should make a 'tools/call' request with the 'providerName_oauth-flow' tool.

For web search:
- Search for the company name to find recent news and information
- Look for funding information, company size, growth trends, and reputation
- Use this information to enhance your qualification assessment

Always include sources for your information:
- List all HubSpot data sources used (e.g., "Data from HubSpot: company profile, contacts")
- Include links to web pages you consulted (e.g., "Sources: company website, LinkedIn profile, news articles")
- Format sources at the end of your Slack message in a "Sources:" section

Always think carefully about which tool to use next based on the current state of your task.
Be thorough in your qualification assessment, including a score from 1-10 and recommended action.`;

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
