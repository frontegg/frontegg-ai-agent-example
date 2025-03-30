import { logger } from '../utils/logger.js';
import { Client } from '@modelcontextprotocol/sdk/client/index';
import { StdioClientTransport, StdioServerParameters } from '@modelcontextprotocol/sdk/client/stdio';
import { z } from 'zod';

// Interface for MCP server process
interface MCPServerProcess {
  name: string;
  isRunning: boolean;
  client?: Client;
  transport?: StdioClientTransport;
}

// Interface for MCP connection options
interface MCPConnectionOptions {
  command: string;
  args?: string[];
  env?: Record<string, string>;
}

// Interface for content item in MCP response
interface ContentItem {
  type: string;
  text?: string;
  [key: string]: any;
}

/**
 * Model Context Protocol (MCP) Client
 * Handles connections to MCP servers for various services (Slack, HubSpot)
 */
export class MCPClient {
  private servers: Map<string, MCPServerProcess>;
  private config: Record<string, MCPConnectionOptions>;

  constructor() {
    this.servers = new Map();
    this.config = {};
  }

  /**
   * Initialize the MCP client
   */
  public async initialize(): Promise<boolean> {
    try {
      logger.info('Initializing MCP client');

      // Validate required environment variables
      this.validateEnvironmentVariables();

      // Setup configuration
      this.config = {
        slack: {
          command: process.execPath,
          args: [
            './node_modules/@modelcontextprotocol/server-slack/dist/index.js'
          ],
          env: {
            SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN || '',
            SLACK_TEAM_ID: process.env.SLACK_TEAM_ID || '',
            NODE_ENV: process.env.NODE_ENV || 'development',
            MCP_TRANSPORT: 'stdio',
            PATH: process.env.PATH || '/usr/local/bin:/usr/bin:/bin'
          }
        },
        hubspot: {
          command: 'docker',
          args: ['run', '-i', '--rm', 'buryhuang/mcp-hubspot:latest', '--access-token', process.env.HUBSPOT_ACCESS_TOKEN || ''],
          env: {
            PATH: process.env.PATH || '/usr/local/bin:/usr/bin:/bin',
            NODE_ENV: process.env.NODE_ENV || 'development'
          }
        }
      };

      // Log more verbose information about the configuration
      logger.debug(`Slack MCP server command: ${this.config.slack.command}`);
      logger.debug(`Slack MCP server args: ${this.config.slack.args?.join(' ') || 'none'}`);
      logger.debug(`Slack MCP environment: SLACK_BOT_TOKEN=${process.env.SLACK_BOT_TOKEN ? 'set' : 'not set'}, SLACK_TEAM_ID=${process.env.SLACK_TEAM_ID || 'not set'}`);
      
      logger.debug(`HubSpot MCP server command: ${this.config.hubspot.command}`);
      logger.debug(`HubSpot MCP server args: ${this.config.hubspot.args?.join(' ') || 'none'}`);
      logger.debug(`HubSpot MCP environment: HUBSPOT_ACCESS_TOKEN=${process.env.HUBSPOT_ACCESS_TOKEN ? 'set' : 'not set'}`);
      
      if (process.env.SLACK_BOT_TOKEN) {
        const maskedToken = process.env.SLACK_BOT_TOKEN.substring(0, 10) + '...';
        logger.info(`SLACK_BOT_TOKEN is set (starts with ${maskedToken})`);
      }
      
      if (process.env.SLACK_TEAM_ID) {
        logger.info(`SLACK_TEAM_ID is set: ${process.env.SLACK_TEAM_ID}`);
      }
      
      if (process.env.HUBSPOT_ACCESS_TOKEN) {
        const maskedToken = process.env.HUBSPOT_ACCESS_TOKEN.substring(0, 10) + '...';
        logger.info(`HUBSPOT_ACCESS_TOKEN is set (starts with ${maskedToken})`);
      }

      logger.info('MCP client initialized successfully');
      return true;
    } catch (error) {
      logger.error(`Failed to initialize MCP client: ${(error as Error).message}`);
      return false;
    }
  }

  /**
   * Validate that required environment variables are set
   */
  private validateEnvironmentVariables(): void {
    // Check Slack environment variables
    if (!process.env.SLACK_BOT_TOKEN) {
      logger.warn('SLACK_BOT_TOKEN is not set in environment variables');
    } else if (process.env.SLACK_BOT_TOKEN.length < 20) {
      logger.warn('SLACK_BOT_TOKEN seems too short. It should start with "xoxb-"');
    } else if (!process.env.SLACK_BOT_TOKEN.startsWith('xoxb-')) {
      logger.warn('SLACK_BOT_TOKEN should start with "xoxb-" for a bot token');
    }
    
    if (!process.env.SLACK_TEAM_ID) {
      logger.warn('SLACK_TEAM_ID is not set in environment variables');
    } else if (!process.env.SLACK_TEAM_ID.startsWith('T')) {
      logger.warn('SLACK_TEAM_ID usually starts with "T" followed by numbers/letters');
    }
    
    if (!process.env.MCP_TRANSPORT) {
      logger.warn('MCP_TRANSPORT is not set in environment variables, defaulting to http');
    }
    if (!process.env.MCP_TRANSPORT_HTTP_PORT) {
      logger.warn('MCP_TRANSPORT_HTTP_PORT is not set in environment variables, defaulting to 3001');
    }

    // Check HubSpot environment variables
    if (!process.env.HUBSPOT_ACCESS_TOKEN) {
      logger.warn('HUBSPOT_ACCESS_TOKEN is not set in environment variables');
    }
  }

  /**
   * Start an MCP server for a specific service
   */
  public async startServer(serviceName: string): Promise<boolean> {
    try {
      // Check if server is already running
      if (this.servers.has(serviceName) && this.servers.get(serviceName)?.isRunning) {
        logger.info(`MCP server for ${serviceName} is already running`);
        return true;
      }

      // Get server configuration
      const serverConfig = this.config[serviceName];
      if (!serverConfig) {
        throw new Error(`No configuration found for MCP server: ${serviceName}`);
      }

      logger.info(`Starting MCP server for ${serviceName}`);
      logger.debug(`Server command: ${serverConfig.command}`);
      if (serviceName === 'hubspot') {
        // For HubSpot, log more details
        const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
        logger.debug(`HubSpot access token ${accessToken ? 'is set' : 'is NOT set'}`);
        if (accessToken) {
          logger.debug(`Access token starts with: ${accessToken.substring(0, 5)}...`);
        }
        logger.debug(`Full command: ${serverConfig.command} ${serverConfig.args?.join(' ')}`);
      } else {
        logger.debug(`Server args: ${serverConfig.args?.join(' ')}`);
      }

      // Create a promise that resolves when the server is ready
      const serverReady = new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Server startup timed out after 60 seconds'));
        }, 60000);

        // Create transport parameters
        const serverParams: StdioServerParameters = {
          command: serverConfig.command,
          args: serverConfig.args || [],
          env: serverConfig.env,
          stderr: 'pipe'
        };

        logger.debug(`Starting ${serviceName} MCP server with command: ${serverConfig.command} ${serverConfig.args?.join(' ')}`);
        logger.debug(`Using environment variables: ${JSON.stringify(Object.keys(serverConfig.env || {}))}`);

        // Create transport and client
        const transport = new StdioClientTransport(serverParams);        
        const client = new Client({
          name: `${serviceName}-client`,
          version: '1.0.0'
        });

        try {
          // Connect client - this will start the transport automatically
          logger.info(`Connecting to ${serviceName} MCP server...`);
          client.connect(transport).then(async () => {
            logger.info(`Connected to ${serviceName} MCP server successfully`);
            
            // Add server to the map
            this.servers.set(serviceName, {
              name: serviceName,
              isRunning: true,
              client,
              transport
            });

            try {
              // Define a schema for the tools list response
              const toolsListSchema = z.object({
                tools: z.array(z.object({ name: z.string() }))
              });

              // List available tools with proper schema
              logger.info(`Listing available tools for ${serviceName}...`);
              const toolsResponse = await client.request({
                method: 'tools/list',
                params: {}
              }, toolsListSchema);
              
              logger.info(`Available tools for ${serviceName}: ${toolsResponse.tools.map(tool => tool.name).join(', ')}`);
            } catch (listError) {
              logger.warn(`Failed to get tools list for ${serviceName}: ${(listError as Error).message}`);
              // Continue even if we can't list the tools
            }

            clearTimeout(timeout);
            resolve();
          }).catch((error: Error) => {
            logger.error(`Error connecting to ${serviceName} MCP server: ${error.message}`);
            if (error.stack) {
              logger.debug(`Stack trace: ${error.stack}`);
            }
            clearTimeout(timeout);
            reject(error);
          });
        } catch (error) {
          logger.error(`Error setting up ${serviceName} MCP server: ${(error as Error).message}`);
          clearTimeout(timeout);
          reject(error);
        }
      });

      // Wait for server to be ready
      await serverReady;
      logger.info(`MCP server for ${serviceName} started successfully`);
      return true;
    } catch (error) {
      logger.error(`Failed to start MCP server for ${serviceName}: ${(error as Error).message}`);
      if (error instanceof Error && error.stack) {
        logger.debug(`Stack trace: ${error.stack}`);
      }
      return false;
    }
  }

  /**
   * Stop an MCP server
   */
  public async stopServer(serviceName: string): Promise<boolean> {
    try {
      if (!this.servers.has(serviceName)) {
        logger.info(`No MCP server running for ${serviceName}`);
        return true;
      }

      const server = this.servers.get(serviceName)!;
      if (!server.isRunning) {
        logger.info(`MCP server for ${serviceName} is not running`);
        return true;
      }

      logger.info(`Stopping MCP server for ${serviceName}`);

      // Close the transport which will kill the server process
      if (server.transport) {
        await server.transport.close();
      }
      
      server.isRunning = false;
      server.client = undefined;
      server.transport = undefined;

      // Remove server from the map
      this.servers.delete(serviceName);

      logger.info(`MCP server for ${serviceName} stopped successfully`);
      return true;
    } catch (error) {
      logger.error(`Failed to stop MCP server for ${serviceName}: ${(error as Error).message}`);
      return false;
    }
  }

  /**
   * Get available services
   */
  public getAvailableServices(): string[] {
    return Object.keys(this.config);
  }

  /**
   * Get running servers
   */
  public getRunningServers(): string[] {
    const runningServers: string[] = [];
    this.servers.forEach((server, name) => {
      if (server.isRunning) {
        runningServers.push(name);
      }
    });
    return runningServers;
  }

  /**
   * Parse response from MCP server
   * Handles text responses that contain JSON
   */
  private parseResponse(response: any): any {
    try {
      // If response has content field with text objects
      if (response && response.content && Array.isArray(response.content)) {
        // Try to extract the text and parse it as JSON
        const textContent = response.content
          .filter((item: ContentItem) => item && item.type === 'text' && item.text)
          .map((item: ContentItem) => item.text)
          .join('');
           
        if (textContent) {
          try {
            // Parse the text content as JSON
            const parsedContent = JSON.parse(textContent);
            logger.debug(`Parsed content from response: ${JSON.stringify(parsedContent)}`);
            return parsedContent;
          } catch (parseError) {
            logger.warn(`Could not parse content as JSON: ${textContent}`);
          }
        }
      }
      
      // If no content field or parsing failed, return the original response
      return response;
    } catch (error) {
      logger.warn(`Error parsing response: ${(error as Error).message}`);
      return response;
    }
  }

  /**
   * Execute a tool on an MCP server
   */
  public async executeTool(
    serviceName: string,
    toolName: string,
    params: any = {}
  ): Promise<any> {
    try {
      // Start the server if not running
      if (!this.servers.has(serviceName) || !this.servers.get(serviceName)?.isRunning) {
        logger.info(`MCP server for ${serviceName} is not running, attempting to start it`);
        const started = await this.startServer(serviceName);
        if (!started) {
          throw new Error(`Failed to start ${serviceName} MCP server`);
        }
      }

      const server = this.servers.get(serviceName);
      if (!server || !server.isRunning || !server.client) {
        throw new Error(`MCP server for ${serviceName} is not running`);
      }

      logger.info(`Executing tool '${toolName}' on MCP server ${serviceName}`);
      logger.debug(`Tool parameters: ${JSON.stringify(params)}`);

      // Define a generic schema for tool responses
      const toolResponseSchema = z.any();
      
      // Execute the tool using the MCP client with proper schema
      try {
        // Format the request according to service requirements
        let requestData: any;
        
        if (serviceName === 'slack' || serviceName === 'hubspot') {
          // Slack and HubSpot servers expect parameters in 'arguments' field
          requestData = {
            method: 'tools/call',
            params: {
              name: toolName,
              arguments: params // Use 'arguments' key as specified in their server implementation
            }
          };
          
          logger.debug(`Executing ${serviceName} tool '${toolName}' with arguments: ${JSON.stringify(params)}`);
        } else {
          // Standard format for other services
          requestData = {
            method: 'tools/call',
            params: {
              name: toolName,
              parameters: params
            }
          };
        }
        
        logger.debug(`Making request: ${JSON.stringify(requestData)}`);
        
        const rawResponse = await server.client.request(requestData, toolResponseSchema);
        logger.debug(`Raw response: ${JSON.stringify(rawResponse)}`);
        
        // Parse response to handle text content
        const response = this.parseResponse(rawResponse);
        
        logger.debug(`Processed response: ${JSON.stringify(response)}`);
        
        // Check for errors in the response
        if (response && (response.error || (response.success === false && response.result?.error))) {
          const errorMessage = response.error || response.result?.error || 'Unknown error';
          logger.warn(`Tool '${toolName}' returned error: ${errorMessage}`);
        }
        
        return response;
      } catch (requestError) {
        logger.error(`Error during MCP request execution: ${(requestError as Error).message}`);
        if (requestError instanceof Error && requestError.stack) {
          logger.debug(`Stack trace: ${requestError.stack}`);
        }
        throw requestError;
      }
    } catch (error) {
      logger.error(`Failed to execute tool '${toolName}' on MCP server ${serviceName}: ${(error as Error).message}`);
      throw error;
    }
  }

  /**
   * Clean up all servers
   */
  public async cleanup(): Promise<void> {
    logger.info('Cleaning up all MCP servers...');
    for (const [serviceName, server] of this.servers.entries()) {
      logger.info(`Cleaning up ${serviceName} MCP server`);
      if (server.transport) {
        await server.transport.close();
      }
      this.servers.delete(serviceName);
    }
    logger.info('All MCP servers stopped');
  }
}

// Create a singleton instance of MCPClient
export const mcpClient = new MCPClient();