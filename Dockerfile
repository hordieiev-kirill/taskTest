FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV FRONTEND_PORT=5173
ENV SOCKET_PORT=4000

EXPOSE 4000 5173

CMD ["sh", "-c", "node server.js & npm run preview -- --host 0.0.0.0 --port 5173"]