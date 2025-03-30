import dotenv from 'dotenv';
import { logger } from './utils/logger';
import { mcpClient } from './services/mcp';
import { assessCompanyQualification, initOpenAI } from './services/openai';

// Load environment variables
dotenv.config();

async function runTest() {
  try {
    logger.info('Starting test...');
    
    // Initialize OpenAI with LangChain
    initOpenAI();
    
    // Initialize MCP client
    const mcpInitialized = await mcpClient.initialize();
    if (!mcpInitialized) {
      logger.error('Failed to initialize MCP client');
      process.exit(1);
    }
    
    // Test company data
    const companyData = {
      id: 'test-123',
      name: 'Test Company',
      industry: 'Technology',
      size: '50-100',
      revenue: '$5M-$10M',
      description: 'Test Company is a fictional company created for testing the AI agent. They provide innovative SaaS solutions for small to medium businesses in the healthcare sector.',
      website: 'https://testcompany.example.com',
      primaryContact: {
        id: 'contact-123',
        name: 'John Test',
        email: 'john@testcompany.example.com'
      }
    };
    
    // Assess company qualification
    logger.info(`Assessing qualification for ${companyData.name}...`);
    const assessment = await assessCompanyQualification(companyData);
    
    logger.info('Assessment result:');
    logger.info(JSON.stringify(assessment, null, 2));
    
    logger.info('Test completed successfully');
  } catch (error) {
    logger.error(`Test failed: ${(error as Error).message}`);
    process.exit(1);
  }
}

// Run the test
runTest().catch(error => {
  logger.error(`Unhandled error in test: ${error.message}`);
  process.exit(1);
}); 