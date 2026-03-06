FROM node:22-alpine

# Install build dependencies for native module
# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 8060

# Define environment variables
ENV NODE_ENV=development
ENV PORT=8060

# Use the non-root 'node' user for security
USER node

# Start the application
CMD ["pnpm", "run", "dev"]

# Optional: Add a healthcheck to ensure the app is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8060/ || exit 1
