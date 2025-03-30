FROM node:18-alpine

# Install Docker client for running MCP server containers
RUN apk add --no-cache docker-cli

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Create logs directory
RUN mkdir -p logs

# Build TypeScript project
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "dist/index.js"] 