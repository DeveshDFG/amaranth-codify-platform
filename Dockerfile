FROM node:latest

WORKDIR /app
COPY . .

RUN npm install -g pnpm && pnpm install

EXPOSE 8000
CMD ["pnpm", "dev"]