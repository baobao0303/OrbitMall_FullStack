FROM node:20-alpine

WORKDIR /app

# Toolchain for native addons (e.g., bcrypt) on Alpine
RUN apk add --no-cache python3 make g++

# Install dependencies first for better layer caching
COPY services/portal-api-gateway/package*.json ./
RUN npm ci --unsafe-perm

# Copy source and build
COPY services/portal-api-gateway ./

# Rebuild bcrypt for musl (Alpine) and then build the app
RUN npm rebuild bcrypt --build-from-source \
  && npm run build

ENV NODE_ENV=production
ENV PORT=5050
EXPOSE 5050

CMD ["npm", "start"]


