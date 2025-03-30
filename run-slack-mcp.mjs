#!/usr/bin/env node

// Simple script to directly run the Slack MCP server (ESM version)
console.log('Starting Slack MCP server...');

// Import the server module
try {
  const serverPath = './node_modules/@modelcontextprotocol/server-slack/dist/index.js';
  console.log(`Looking for server at: ${serverPath}`);
  
  // Dynamic import
  const importPromise = import(serverPath);
  importPromise.then(() => {
    console.log('Server module loaded successfully');
  }).catch(error => {
    console.error('Error importing Slack MCP server module:', error.message);
    console.error(error.stack);
    process.exit(1);
  });
} catch (error) {
  console.error('Error loading Slack MCP server module:', error.message);
  console.error(error.stack);
  process.exit(1);
} 