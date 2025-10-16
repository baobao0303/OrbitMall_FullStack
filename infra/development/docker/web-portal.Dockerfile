FROM node:20-alpine

WORKDIR /app

COPY frontend/web-portal/package*.json ./
RUN npm install --legacy-peer-deps

COPY frontend/web-portal ./

# Build Angular app and libraries
RUN npm run build:all || npm run build

ENV NG_CLI_ANALYTICS=false
ENV PORT=4000
EXPOSE 4000

CMD ["npm", "run", "start:ssr"]


