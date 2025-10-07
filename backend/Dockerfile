# 1) Use a lightweight Node.js base image
FROM node:18-alpine

# 2) Set working directory inside the container
WORKDIR /app

# 3) Copy only dependency files first (better build caching)
COPY package*.json ./

# 4) Install only production dependencies
RUN npm ci --only=production --no-audit --no-fund

# 5) Copy the rest of the application code
COPY . .

# 6) Set environment variables
ENV NODE_ENV=production
# You can also set PORT here if needed
# ENV PORT=5000

# 7) Expose the port the app runs on
EXPOSE 5000

# 8) Default command to run the server
CMD ["npm", "start"]
