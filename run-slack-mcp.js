#!/usr/bin/env node

// Simple script to directly run the Slack MCP server
console.log('Starting Slack MCP server...');

// Require the server module
try {
  const serverPath = './node_modules/@modelcontextprotocol/server-slack/dist/index.js';
  console.log(`Looking for server at: ${serverPath}`);
  require(serverPath);
  console.log('Server module loaded successfully');
} catch (error) {
  console.error('Error loading Slack MCP server module:', error.message);
  console.error(error.stack);
  process.exit(1);
} 