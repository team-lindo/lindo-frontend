# Step 1: Build Stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy application source code
COPY . .

# Build the Next.js application
RUN npm run build

# Step 2: Runtime Stage
FROM node:20-alpine AS runner

# Install PM2 globally
RUN npm install -g pm2

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Set working directory
WORKDIR /app

# Copy the necessary files from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the application port
EXPOSE 3000

# Use PM2 to start the Next.js application
CMD ["pm2-runtime", "start", "npm", "--", "start"]