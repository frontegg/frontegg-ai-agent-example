FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code and configuration
COPY tsconfig.json ./
COPY src ./src
COPY mcp.json ./

# Build TypeScript code
RUN npm run build

# Set environment variables
ENV NODE_ENV=production

# Make the run-llm-agent script executable
RUN chmod +x ./dist/scripts/run-llm-agent.js

# Run the LLM agent script
CMD ["node", "./dist/scripts/run-llm-agent.js"] 