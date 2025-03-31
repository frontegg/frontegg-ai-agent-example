#!/usr/bin/env node

// Load environment variables first
import dotenv from 'dotenv';
dotenv.config();

import { logger } from '../utils/logger';
import { ChatOpenAI } from '@langchain/openai';
import { createLLMAgent } from '../services/llm-agent';

/**
 * Run LLM agent to assess the latest signup and send a Slack notification
 */
async function main() {
  try {
    // Check required environment variables
    const requiredEnvVars = [
      'SLACK_BOT_TOKEN',
      'SLACK_TEAM_ID',
      'HUBSPOT_ACCESS_TOKEN',
      'OPENAI_API_KEY',
    ];

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    if (missingVars.length > 0) {
      logger.error(`Missing required environment variables: ${missingVars.join(', ')}`);
      process.exit(1);
    }

    logger.info('Starting LLM Agent to process latest signup...');

    // Initialize OpenAI model
    logger.info('Initializing OpenAI chat model...');
    const model = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'gpt-4o',
      temperature: 0.7
    });
    
    // Create the LLM agent
    logger.info('Creating LLM Agent...');
    const agent = createLLMAgent(model);
    
    // Initialize the agent with MCP servers
    logger.info('Initializing LLM Agent with MCP servers...');
    const initialized = await agent.initialize();
    if (!initialized) {
      logger.error('Failed to initialize LLM Agent');
      process.exit(1);
    }
    
    // Process latest signup
    logger.info('Running agent to process latest signup...');
    const result = await agent.processLatestSignup();
    
    // Log agent result
    logger.info('Agent execution completed');
    logger.info(`Agent result: ${JSON.stringify(result)}`);
    
    // Clean up
    logger.info('Cleaning up...');
    await agent.cleanup();
    
    logger.info('Agent run completed');
  } catch (error) {
    logger.error(`Error during agent run: ${(error as Error).message}`);
    if (error instanceof Error && error.stack) {
      logger.debug(`Stack trace: ${error.stack}`);
    }
    
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  logger.error(`Unhandled error: ${error.message}`);
  process.exit(1);
}); 