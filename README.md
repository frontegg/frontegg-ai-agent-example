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

Set the following environment variables in your `.env` file:

### Shared backend and frontend vars
- `VITE_FRONTEGG_CLIENT_ID` - Your Frontegg client ID (required for both frontend and backend)
- `VITE_FRONTEGG_AGENT_ID` - Your Frontegg agent ID (required for both frontend and backend)

### Backend only vars
- `FRONTEGG_CLIENT_SECRET` - Your Frontegg client secret (used by backend only)
- `OPENAI_API_KEY` - OpenAI API key for the agent (used by backend only)

### Frontend only vars
- `VITE_API_BASE_URL` - Base URL for the backend API (e.g., http://localhost:3001)
- `VITE_FRONTEGG_BASE_URL` - Frontegg base URL for authentication (e.g., https://app-xxxx.stg.frontegg.com)

## Development Scripts

- `npm run dev:all`