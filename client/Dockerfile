FROM node:20.11-slim as build

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable
RUN pnpm install
COPY . .

CMD ["pnpm", "start"]
