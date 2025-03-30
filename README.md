# AI Agent for Lead Qualification

This project implements an AI agent that connects to HubSpot and Slack via the Model Context Protocol (MCP) servers to automatically assess and qualify new company signups using LangChain and OpenAI.

## Features

- Connects to HubSpot via MCP to retrieve new signups
- Uses LangChain with OpenAI's GPT-4 to assess company qualification
- Sends qualification notifications to Slack via MCP
- Implements official MCP servers for service connections

## Project Structure

```
qualification-agent/
├── src/
│   ├── index.ts                 # Main application entry point
│   ├── services/                # Services layer
│   │   ├── hubspot.ts           # HubSpot service using MCP
│   │   ├── mcp.ts               # MCP client implementation
│   │   ├── openai.ts            # LangChain with OpenAI service
│   │   └── slack.ts             # Slack service using MCP
│   ├── types/                   # Type definitions
│   │   └── index.ts             # Shared type interfaces
│   └── utils/                   # Utilities
│       └── logger.ts            # Logging utility
├── config/                      # Configuration files
├── .env.example                 # Example environment variables
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
├── Dockerfile                   # Docker configuration
├── docker-compose.yml           # Docker Compose configuration
└── README.md                    # Project documentation
```

## Prerequisites

### Slack Setup

1. Create a Slack App at [api.slack.com/apps](https://api.slack.com/apps)
2. Add the following Bot Token Scopes:
   - `channels:history` - View messages in public channels
   - `channels:read` - View basic channel information
   - `chat:write` - Send messages
   - `reactions:write` - Add emoji reactions
   - `users:read` - View user information
3. Install the app to your workspace
4. Save the Bot User OAuth Token (starts with `xoxb-`)
5. Find your Team ID (starts with a `T`)

### HubSpot Setup

1. Log into your HubSpot account
2. Go to Settings > Integrations > Private Apps
3. Create a new private app with the following scopes:
   - `crm.objects.contacts.read`
   - `crm.objects.contacts.write`
   - `crm.objects.companies.read`
   - `crm.objects.companies.write`
   - `crm.objects.deals.read`
   - `crm.objects.deals.write`
4. Copy the access token

## Installation

### Local Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/qualification-agent.git
cd qualification-agent
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the template:
```bash
cp .env.example .env
```

4. Fill in the environment variables in the `.env` file:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `SLACK_BOT_TOKEN`: Your Slack bot token (starts with `xoxb-`)
   - `SLACK_TEAM_ID`: Your Slack team ID (starts with `T`)
   - `HUBSPOT_ACCESS_TOKEN`: Your HubSpot access token

### Docker Installation

1. Clone the repository and navigate to the project folder:
```bash
git clone https://github.com/yourusername/qualification-agent.git
cd qualification-agent
```

2. Create a `.env` file with your credentials:
```bash
cp .env.example .env
# Edit the .env file with your credentials
```

3. Build and start the containers:
```bash
docker-compose up -d
```

4. To view logs:
```bash
docker-compose logs -f
```

5. To stop the containers:
```bash
docker-compose down
```

## MCP Servers

This project uses the Model Context Protocol (MCP) to connect to services:

### Slack MCP Server
- Official MCP server for Slack: [@modelcontextprotocol/server-slack](https://github.com/modelcontextprotocol/servers/tree/main/src/slack)
- Installed via NPX during runtime

### HubSpot MCP Server
- Community MCP server for HubSpot: [mcp-hubspot](https://github.com/baryhuang/mcp-hubspot)
- Runs via Docker

## LangChain Integration

This project uses LangChain to interact with OpenAI's GPT-4. LangChain provides:

- Simplified prompt management
- Structured output parsing
- Easy integration with multiple LLM providers
- Ability to create processing chains

The company qualification logic is implemented as a LangChain processing pipeline in `src/services/openai.ts`:

```typescript
// Create the chain
const chain = promptTemplate.pipe(chatModel).pipe(parser);

// Run the chain
const result = await chain.invoke({
  name: companyData.name,
  industry: companyData.industry || 'N/A',
  // ... other parameters
  format_instructions: parser.getFormatInstructions()
});
```

## Development

```bash
npm run dev
```

## Testing

Run a simple test of the qualification assessment:
```bash
npm run test:simple
```

## Building for Production

```bash
npm run build
```

## Running in Production

### Node.js
```bash
npm start
```

### Docker
```bash
docker-compose up -d
```

## API Endpoints

The application exposes minimal HTTP endpoints since most functionality is handled through MCP servers:

- `GET /api/mcp/status` - Check MCP servers status
- `GET /health` - Health check endpoint with service status

## MCP Integration

This project uses MCP servers to handle all service integrations:

### HubSpot Integration
- Company and contact management
- New signup processing
- Webhook handling for real-time updates

### Slack Integration
- Qualification notifications
- Status updates
- Team communication

All service interactions are handled through the MCP servers, eliminating the need for direct API route handling.

## Adding Qualification Logic

The qualification logic can be customized in the `src/services/openai.ts` file, specifically in the `assessCompanyQualification` function. You can modify the LangChain prompt template and parser to adjust the assessment criteria.

## License

MIT 