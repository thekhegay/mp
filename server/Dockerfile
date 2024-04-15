FROM node:20.11-slim

WORKDIR /server

COPY package.json pnpm-lock.yaml ./
RUN corepack enable
RUN pnpm install
COPY . .

CMD ["pnpm", "start"]
