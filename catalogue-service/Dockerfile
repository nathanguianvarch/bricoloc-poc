FROM oven/bun:latest AS catalogue-service-build
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
RUN bun run build

FROM oven/bun:latest
WORKDIR /app
COPY --from=catalogue-service-build /app/dist ./dist
EXPOSE 3001
CMD ["bun", "dist/index.js"]