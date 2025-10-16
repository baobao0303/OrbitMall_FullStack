FROM node:20-alpine

WORKDIR /app

COPY frontend/web-trip/package*.json ./

RUN npm install

COPY frontend/web-trip ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]