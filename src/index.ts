// Load environment variables first
import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import { logger } from './utils/logger';
import { initOpenAI } from './services/openai';
import { mcpClient } from './services/mcp';
import { getRecentSignups, processNewSignup } from './services/hubspot';
import { assessCompanyQualification } from './services/openai';
import { sendQualificationNotification } from './services/slack';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Initialize services
async function initializeServices() {
  try {
    // Initialize MCP client
    const mcpInitialized = await mcpClient.initialize();
    if (!mcpInitialized) {
      logger.error('Failed to initialize MCP client');
      process.exit(1);
    }
    
    // Start MCP servers
    logger.info('Starting MCP servers...');
    
    // Start Slack MCP server
    const slackStarted = await mcpClient.startServer('slack');
    if (!slackStarted) {
      logger.warn('Failed to start Slack MCP server. Some Slack features may not work.');
    } else {
      logger.info('Slack MCP server started successfully');
    }
    
    // Start HubSpot MCP server
    const hubspotStarted = await mcpClient.startServer('hubspot');
    if (!hubspotStarted) {
      logger.warn('Failed to start HubSpot MCP server. Some HubSpot features may not work.');
    } else {
      logger.info('HubSpot MCP server started successfully');
    }
    
    // Initialize OpenAI
    initOpenAI();
    
    logger.info('All services initialized successfully');
  } catch (error) {
    logger.error(`Error initializing services: ${(error as Error).message}`);
    process.exit(1);
  }
}

// Get recent signups endpoint
app.get('/api/hubspot/signups', async (req: Request, res: Response) => {
  try {
    const processSignups = req.query.process === 'true';
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const signups = await getRecentSignups(limit);

    if (processSignups) {
      // Process each signup
      const results = await Promise.all(
        signups.map(async (signup) => {
          try {
            // Get full company data
            const companyData = await processNewSignup(signup.id);
            
            // Assess qualification
            const assessment = await assessCompanyQualification(companyData);
            
            // Send notification
            await sendQualificationNotification(companyData.name, assessment.assessment);
            
            return {
              id: signup.id,
              name: signup.name,
              status: 'processed',
              assessment
            };
          } catch (error) {
            return {
              id: signup.id,
              name: signup.name,
              status: 'error',
              error: (error as Error).message
            };
          }
        })
      );
      
      res.status(200).json({
        count: signups.length,
        processed: true,
        results
      });
    } else {
      // Just return the signups without processing
      res.status(200).json({
        count: signups.length,
        processed: false,
        signups
      });
    }
  } catch (error) {
    logger.error(`Error in signups endpoint: ${(error as Error).message}`);
    res.status(500).json({ error: 'Failed to fetch signups' });
  }
});

// Assess last 3 signups endpoint
app.get('/api/hubspot/assess-recent', async (req: Request, res: Response) => {
  try {
    // Get recent signups limited to 3
    const signups = await getRecentSignups(1);
    const lastThreeSignups = signups;
    
    if (!lastThreeSignups.length) {
      return res.status(404).json({
        message: 'No recent signups found',
        count: 0
      });
    }

    // Process and assess each signup
    const assessments = await Promise.all(
      lastThreeSignups.map(async (signup) => {
        try {
          // Get full company data
          const companyData = await processNewSignup(signup.id);
          
          // Assess qualification
          const assessment = await assessCompanyQualification(companyData);
          
          // Send notification
          await sendQualificationNotification(companyData.name, assessment.assessment);
          
          return {
            company: companyData,
            qualification: assessment,
            status: 'success',
            processedAt: new Date().toISOString()
          };
        } catch (error) {
          logger.error(`Error processing signup ${signup.id}: ${(error as Error).message}`);
          return {
            company: {
              id: signup.id,
              name: signup.name
            },
            status: 'error',
            error: (error as Error).message,
            processedAt: new Date().toISOString()
          };
        }
      })
    );
    
    res.status(200).json({
      count: assessments.length,
      assessments: assessments
    });
    
  } catch (error) {
    logger.error(`Error in assess-recent endpoint: ${(error as Error).message}`);
    res.status(500).json({ 
      error: 'Failed to assess recent signups',
      details: (error as Error).message 
    });
  }
});

// MCP status endpoint
app.get('/api/mcp/status', async (req: Request, res: Response) => {
  try {
    const availableServices = mcpClient.getAvailableServices();
    const runningServers = mcpClient.getRunningServers();
    
    res.status(200).json({
      available: availableServices,
      running: runningServers,
      status: runningServers.length > 0 ? 'operational' : 'degraded'
    });
  } catch (error) {
    logger.error(`Error getting MCP status: ${(error as Error).message}`);
    res.status(500).json({ error: 'Failed to get MCP status' });
  }
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'ok',
    services: {
      mcp: mcpClient.getRunningServers().length > 0 ? 'operational' : 'degraded',
      openai: process.env.OPENAI_API_KEY ? 'configured' : 'not configured'
    }
  });
});

// Test Slack notification endpoint
app.post('/api/slack/test-notification', async (req: Request, res: Response) => {
  try {
    const { company = 'Test Company', assessment = 'This is a test qualification assessment.' } = req.body;
    
    logger.info('Sending test Slack notification');
    
    const result = await sendQualificationNotification(
      company,
      assessment
    );
    
    res.status(200).json({
      success: true,
      message: 'Test notification sent successfully',
      details: result
    });
  } catch (error) {
    logger.error(`Error sending test notification: ${(error as Error).message}`);
    res.status(500).json({ 
      success: false,
      error: 'Failed to send test notification',
      details: (error as Error).message 
    });
  }
});

// Start server
async function startServer() {
  await initializeServices();
  
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

// Handle cleanup when shutting down
process.on('SIGINT', async () => {
  logger.info('Shutting down...');
  await mcpClient.cleanup();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('Shutting down...');
  await mcpClient.cleanup();
  process.exit(0);
});

// Start the application
startServer().catch(error => {
  logger.error(`Failed to start server: ${error.message}`);
  process.exit(1);
}); 