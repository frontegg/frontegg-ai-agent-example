# Qualification Agent

An intelligent agent that connects to HubSpot and Slack using the Model Context Protocol (MCP) and LangChain. The agent automatically retrieves the latest company signup from HubSpot, qualifies the lead, and sends an assessment message to Slack.

## Features

- 🔌 Connects to HubSpot and Slack using MCP servers
- 🤖 Uses LangChain for agent creation and OpenAI for intelligent analysis
- 🔄 Automatically processes latest company signups
- 🔍 Web browsing capability for enhanced company research
- 📊 Provides qualification scores and recommended actions
- 📣 Sends notifications to Slack with assessment results

## Prerequisites

- Node.js (v18+)
- npm or yarn
- OpenAI API key
- Slack Bot Token and Team ID
- HubSpot Access Token

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Configuration

1. Create a `.env` file in the root directory with the following environment variables:

```
OPENAI_API_KEY=your_openai_api_key
SLACK_BOT_TOKEN=your_slack_bot_token
SLACK_TEAM_ID=your_slack_team_id
HUBSPOT_ACCESS_TOKEN=your_hubspot_access_token
```

2. The MCP configuration is stored in `mcp.json` which defines the Slack and HubSpot servers.

## Running the Agent

### Using npm

```bash
npm run build
npm run llm-agent
```

### Using Docker

Build and run the Docker container:

```bash
docker build -t qualification-agent .
docker run --env-file .env qualification-agent
```

## How It Works

The agent follows these steps:

1. Connects to HubSpot and Slack using MCP servers
2. Retrieves the latest company signup from HubSpot
3. Uses GPT-4o's web browsing capability to research the company online
4. Analyzes all available information to determine if they're a good potential customer
5. Generates a qualification assessment with a score (1-10) and recommended action
6. Sends the assessment to Slack channel C08KN71QZD1

All processing includes source attribution to show where information was obtained from.

## Troubleshooting

- Check that all required environment variables are set
- Ensure the MCP configuration in `mcp.json` is correct
- Look at the logs for detailed information and error messages
- Verify that the Slack bot has the necessary permissions
- Make sure your OpenAI API key has access to GPT-4o with browsing

## Development

The main components of the system are:

- `src/scripts/run-llm-agent.ts`: The main entry point for running the agent
- `src/services/llm-agent.ts`: The agent logic with web search integration
- `mcp.json`: MCP server configuration

## LangChain MCP Adapters Integration

This project uses the `@langchain/mcp-adapters` library to convert MCP servers into LangChain tools. This allows us to:

1. Connect to multiple MCP servers (Slack, HubSpot)
2. Convert their tools into LangChain-compatible tools
3. Use these tools with LangChain's agent framework

The implementation is in `src/services/llm-agent.ts`:

```typescript
// Create a MultiServerMCPClient to connect to multiple MCP servers
const mcpClient = new MultiServerMCPClient();

// Connect to HubSpot MCP server
await mcpClient.connectToServerViaStdio(
  'hubspot',
  'docker',
  ['run', '-i', '--rm', 'buryhuang/mcp-hubspot:latest', '...']
);

// Connect to Slack MCP server
await mcpClient.connectToServerViaStdio(
  'slack',
  process.execPath,
  ['./node_modules/@modelcontextprotocol/server-slack/dist/index.js']
);

// Get all tools as LangChain tools
const tools = mcpClient.getTools();

// Create a LangChain agent with these tools
const agent = AgentExecutor.fromAgentAndTools({
  agent: createStructuredChatAgent({
    llm: model,
    tools: tools
  }),
  tools: tools,
  verbose: true
});

// Run the agent
const result = await agent.invoke({
  input: "Assess the latest signup from HubSpot"
});
```

## API Endpoints

The application provides several HTTP endpoints:

- `GET /api/hubspot/signups` - Get recent signups from HubSpot
  
- `GET /api/hubspot/assess-recent` - Assess recent signups
  
- `GET /api/mcp/status` - Check MCP servers status
  
- `GET /health` - Health check endpoint
  
- `POST /api/slack/test-notification` - Send a test notification to Slack

- `GET /api/llm-agent/process-latest-signup` - Process the latest signup using the LangChain LLM agent

## License

MIT 