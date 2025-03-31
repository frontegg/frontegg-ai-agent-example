import { ChatOpenAI } from '@langchain/openai';
import { MultiServerMCPClient } from '@langchain/mcp-adapters';
import { logger } from '../utils/logger';
import { AgentExecutor, createOpenAIFunctionsAgent } from 'langchain/agents';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { WebBrowser } from "langchain/tools/webbrowser";
import { OpenAIEmbeddings } from '@langchain/openai';

/**
 * LLM Agent that uses LangChain and MCP Adapters
 * Creates an agent that can autonomously use HubSpot and Slack MCP tools
 */
export class LLMAgent {
  private model: ChatOpenAI;
  private mcpClient: MultiServerMCPClient;
  private agent: AgentExecutor | null = null;

  constructor(model: ChatOpenAI) {
    // Create new model instance with GPT-4o
    this.model = new ChatOpenAI({
      modelName: 'gpt-4o',
      temperature: 0.7,
      openAIApiKey: process.env.OPENAI_API_KEY
    });
    
    // Initialize client from config file
    this.mcpClient = MultiServerMCPClient.fromConfigFile('./mcp.json');
    
    logger.info('Using GPT-4o model with web search capabilities');
  }

  /**
   * Initialize the agent with MCP servers
   */
  public async initialize(): Promise<boolean> {
    try {
      logger.info('Initializing LLM Agent with MCP servers');
      
      // Initialize connections from config file
      await this.mcpClient.initializeConnections();
      
      // Get tools from all servers
      const tools = this.mcpClient.getTools();
      
      // Log information about loaded tools
      logger.info(`Loaded ${tools.length} tools from MCP servers`);
      
      // Log each tool
      tools.forEach((tool) => {
        logger.info(`- ${tool.name}: ${tool.description}`);
      });

      // Create embeddings for the web browser tool
      const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY
      });

      // Add WebBrowser tool for searching information online
      const browser = new WebBrowser({ 
        model: this.model,
        embeddings: embeddings
      });
      
      tools.push(browser as any);
      
      logger.info('Added web search capability to agent tools');
      
      // Create system message text
      const systemMessage = 
        `You are an AI agent that helps assess potential customers.

You have access to tools to interact with HubSpot and Slack:
- HubSpot tools let you retrieve company information and contacts
- Slack tools let you send notifications to the team
- Web search capability to find additional information about companies online

When asked to assess the latest signup:
1. Use HubSpot tools to get the latest company signup (hubspot_get_active_companies with limit=1)
2. Use web search to gather more information about the company (industry trends, news, company reputation)
3. Analyze the combined information to determine if they're a good potential customer
4. Send a notification with your assessment to the team via Slack (SLACK_SENDS_A_MESSAGE_TO_A_CHANNEL)

IMPORTANT: You MUST ALWAYS send Slack messages ONLY to channel ID C08KN71QZD1. 
Never send messages to any other channel under any circumstances.
When using SLACK_SENDS_A_MESSAGE_TO_A_CHANNEL, always set the channel parameter to "C08KN71QZD1".

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
        ["system", systemMessage],
        ["human", "{input}"],
        new MessagesPlaceholder("agent_scratchpad"),
      ]);
      
      try {
        // Create OpenAI functions agent with type assertions to bypass type incompatibilities
        const agent = await createOpenAIFunctionsAgent({
          llm: this.model as any,
          tools: tools as any,
          prompt: prompt as any
        });
        
        // Create agent executor with type assertions
        this.agent = new AgentExecutor({
          agent: agent as any,
          tools: tools as any,
          verbose: true
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
      Make sure to include all sources of information you used in a "Sources:" section at the end of your message.`
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
export function createLLMAgent(model: ChatOpenAI): LLMAgent {
  return new LLMAgent(model);
} 