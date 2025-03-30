FROM node:18-slim

WORKDIR /app

# Install dependencies
RUN npm install -g @modelcontextprotocol/server-slack@latest

# Set environment variables
ENV NODE_ENV=production
ENV MCP_TRANSPORT=stdio

# Run the server
ENTRYPOINT ["npx", "@modelcontextprotocol/server-slack", "start", "--transport", "stdio"] 