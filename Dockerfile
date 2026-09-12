FROM oven/bun:1 AS base
WORKDIR /app

# Copy dependency files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --production

# Copy source code and public assets
COPY . .

# Environment
ENV NODE_ENV=production
EXPOSE 3000

# Start application
CMD ["bun", "src/server.ts"]
