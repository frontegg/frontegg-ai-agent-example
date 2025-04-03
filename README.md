# AI Agent for Company Qualification

An AI agent that connects to Hubspot and Slack via MCP to assess company qualification. Built with Next.js, LangChain, and OpenAI.

## Features

- 🤖 AI-powered company qualification assessment
- 🔄 Real-time chat interface
- 🔍 Web search capabilities
- 📊 HubSpot integration for company data
- 💬 Slack notifications for team updates
- 🌙 Dark mode support
- 📱 Responsive design

## Prerequisites

- Node.js 18+ and npm
- OpenAI API key
- HubSpot API key
- Slack API key
- MCP configuration file (`mcp.json`)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
OPENAI_API_KEY=your_openai_api_key
HUBSPOT_API_KEY=your_hubspot_api_key
SLACK_BOT_TOKEN=your_slack_bot_token
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-agent-rafi.git
cd ai-agent-rafi
```

2. Install dependencies:
```bash
npm install
```

3. Create and configure your `mcp.json` file:
```json
{
  "servers": [
    {
      "name": "hubspot",
      "type": "hubspot",
      "config": {
        "apiKey": "your_hubspot_api_key"
      }
    },
    {
      "name": "slack",
      "type": "slack",
      "config": {
        "token": "your_slack_bot_token"
      }
    }
  ]
}
```

## Development

Run the Next.js development server:
```bash
npm run dev:next
```

The application will be available at `http://localhost:3000`.

## Building for Production

1. Build the Next.js application:
```bash
npm run build:next
```

2. Start the production server:
```bash
npm run start:next
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── agent/        # Agent API endpoint
│   │   └── hubspot/      # HubSpot API endpoint
│   │   └── mcp/          # MCP API endpoint
│   │   └── slack/        # Slack API endpoint
│   │   └── health/       # Health check endpoint
│   │   └── llm-agent/    # LLM agent API endpoint
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── AgentChat.tsx    # Main chat interface
│   ├── ChatMessage.tsx  # Individual message component
│   ├── PromptInput.tsx  # Message input component
│   └── QualificationCard.tsx  # Qualification result display
├── services/            # Business logic
│   └── llm-agent.ts    # LLM agent implementation
└── utils/              # Utility functions
    └── client-logger.ts # Client-side logging
```

## Features

### Chat Interface
- Real-time message updates
- Markdown support with syntax highlighting
- Code block formatting
- Loading indicators
- Dark mode support

### Agent Capabilities
- Company qualification assessment
- Web search integration
- HubSpot data retrieval
- Slack notifications
- Source tracking and citation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 