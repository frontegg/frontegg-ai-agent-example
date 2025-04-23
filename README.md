# Commitment Lifecycle Agent

This project demonstrates how to build AI agents using the Frontegg AI framework SDK. It serves as a reference implementation for developers looking to create authenticated AI agents with third-party integrations and user context management.

## Overview

The project showcases:
- Integration with Frontegg AI framework SDK for authentication and user management
- Building AI agents with user and identity context
- Connecting to third-party applications (Slack, Jira, HubSpot, Google Calendar)
- React-based frontend with real-time agent interactions
- Express.js backend for agent orchestration

## Features

- **Authentication & Authorization**: Leverages Frontegg for secure user authentication
- **User Context**: Demonstrates how to maintain user context in AI agent interactions
- **Third-Party Integrations**: Shows integration patterns with various business tools

## Tech Stack

- Frontend: React, Vite, TailwindCSS
- Backend: Express.js, TypeScript
- AI Framework: Frontegg AI Agents SDK
- Authentication: Frontegg
- Integrations: Slack, Jira, HubSpot, Google Calendar

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your Frontegg credentials and other API keys

4. Start the development server:
   ```bash
   npm run dev:all
   ```

## Environment Variables

Required environment variables:
- `FRONTEGG_CLIENT_ID`: Your Frontegg client ID
- `FRONTEGG_CLIENT_SECRET`: Your Frontegg client secret
- `OPENAI_API_KEY`: OpenAI API key for the agent
- Other integration-specific keys as needed

## Development Scripts

- `npm run dev:all` - Start both frontend and backend in development mode
- `npm run dev:fe` - Start frontend only
- `npm run dev:server` - Start backend only
- `npm run build:fe` - Build frontend
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Project Structure

```
├── src/
│   ├── components/    # React components
│   ├── services/     # Agent and integration services
│   ├── utils/        # Utility functions
│   ├── server.ts     # Express backend
│   └── main.tsx      # Frontend entry
├── public/           # Static assets
└── package.json      # Project configuration
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

MIT License - see LICENSE file for details 