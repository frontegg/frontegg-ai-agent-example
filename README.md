# Commitment Lifecycle Agent

A Frontegg AI agent that seamlessly connects to Jira, Slack, HubSpot, and Google Calendar to manage and track commitments throughout their lifecycle. Built with React, Express, LangChain, and OpenAI, leveraging Frontegg's AI agents platform for automated authentication and authorization across all integrated tools.

## Features

- 🤖 AI-powered commitment tracking and management
- 🔄 Real-time chat interface
- 🔐 Seamless authentication via Frontegg
- 📊 Jira integration for task tracking
- 💬 Slack notifications for commitment updates
- 📈 HubSpot integration for customer context
- 📅 Google Calendar integration for scheduling
- 🌙 Dark mode support
- 📱 Responsive design

## Prerequisites

- Node.js 18+ and npm
- OpenAI API key
- Frontegg account and workspace
- Access to required tools (Jira, Slack, HubSpot, Google Calendar)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Frontegg Configuration
FRONTEGG_CLIENT_ID=your_frontegg_client_id
FRONTEGG_CLIENT_SECRET=your_frontegg_client_secret
FRONTEGG_APP_URL=your_frontegg_app_url
FRONTEGG_BASE_URL=your_frontegg_base_url
FRONTEGG_AFTER_LOGIN_REDIRECT=your_after_login_url

# API Base URLs
REACT_APP_API_BASE_URL=your_api_base_url
EXPRESS_PORT=3001

# Tool-specific Configuration (Optional)
JIRA_API_TOKEN=your_jira_api_token
SLACK_BOT_TOKEN=your_slack_bot_token
HUBSPOT_API_KEY=your_hubspot_api_key
GOOGLE_CALENDAR_CREDENTIALS=your_google_calendar_credentials
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/commitment-lifecycle-agent.git
cd commitment-lifecycle-agent
```

2. Install dependencies:
```bash
npm install
```

3. Configure your Frontegg workspace:
   - Set up your Frontegg account at https://portal.frontegg.com
   - Create a new agent
   - Configure the integrated tools (Jira, Slack, HubSpot, Google Calendar)
   - Copy your environment client ID and secret to the `.env` file

## Development

You can start both the frontend and backend servers with a single command:
```bash
npm run dev:all
```

Or run them separately:

1. Start the Express backend server:
```bash
npm run server
```

2. In a separate terminal, start the React development server:
```bash
npm run start
```

The frontend application will be available at `http://localhost:3000` and the backend API at `http://localhost:3001`.

## Building for Production

1. Build the React application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start:prod
```

## Project Structure

```
├── client/                # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── AgentChat.tsx    # Main chat interface
│   │   │   ├── ChatMessage.tsx  # Individual message component
│   │   │   ├── PromptInput.tsx  # Message input component
│   │   │   └── CommitmentCard.tsx  # Commitment tracking display
│   │   ├── services/    # Frontend services
│   │   ├── utils/      # Utility functions
│   │   └── App.tsx    # Root React component
├── server/              # Express backend
│   ├── routes/         # API routes
│   │   ├── agent.ts    # Agent endpoints
│   │   ├── jira.ts     # Jira endpoints
│   │   ├── slack.ts    # Slack endpoints
│   │   ├── hubspot.ts  # HubSpot endpoints
│   │   └── calendar.ts # Google Calendar endpoints
│   ├── services/       # Business logic
│   │   └── llm-agent.ts # LLM agent implementation
│   ├── utils/          # Utility functions
│   └── server.ts       # Express app entry point
└── package.json
```

## Features

### Chat Interface
- Real-time message updates
- Markdown support with syntax highlighting
- Code block formatting
- Loading indicators
- Dark mode support

### Agent Capabilities
- Commitment lifecycle tracking
- Automated tool authentication via Frontegg
- Jira task creation and management
- Slack notifications for updates
- HubSpot customer context integration
- Google Calendar event scheduling
- Source tracking and citation
- Commitment status monitoring

### Authentication & Authorization
- Single sign-on through Frontegg
- Automated OAuth flows for all tools
- Secure token management
- Role-based access control
- Audit logging

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 