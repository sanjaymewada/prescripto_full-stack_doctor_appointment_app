# Single-stage Node image
FROM node:18-alpine

# Working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy source code
COPY . .

# Build production bundle
ENV NODE_ENV=production
RUN npm run build

# Install a small static server to serve the dist/ folder
RUN npm install -g serve

# Expose container port
EXPOSE 80

# Start static server to serve build
CMD ["serve", "-s", "dist", "-l", "80"]
