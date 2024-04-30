FROM node:20-alpine
WORKDIR /app
COPY . .
ENV COREPACK_ENABLE_STRICT=0
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build
CMD [ "pnpm", "start" ]