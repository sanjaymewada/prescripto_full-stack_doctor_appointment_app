# 1) Use lightweight Node.js base image
FROM node:18-alpine

# 2) Set working directory
WORKDIR /app

# 3) Copy only package files first for caching
COPY package*.json ./

# 4) Install dependencies
RUN npm ci --no-audit --no-fund

# 5) Copy the rest of the source code
COPY . .

# 6) Build the Vite project for production
ENV NODE_ENV=production
RUN npm run build

# 7) Install a simple static server to serve the dist/ build
RUN npm install -g serve

# 8) Expose the port that the static server will use
EXPOSE 80

# 9) Default command to run the static server
CMD ["serve", "-s", "dist", "-l", "80"]
