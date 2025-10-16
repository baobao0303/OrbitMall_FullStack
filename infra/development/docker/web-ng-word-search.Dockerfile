FROM node:20-alpine

WORKDIR /app

# Install dependencies first for better layer caching
COPY frontend/web-ng-word-search/package*.json ./
RUN npm ci --unsafe-perm

# Copy source and build
COPY frontend/web-ng-word-search ./

# Build the application
RUN npm run build

ENV NODE_ENV=production
ENV PORT=6001
EXPOSE 6001

CMD ["npm", "start"]
