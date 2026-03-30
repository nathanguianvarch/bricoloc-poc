FROM oven/bun:latest AS stock-service-build
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
RUN bun run build

FROM oven/bun:latest
WORKDIR /app
COPY --from=stock-service-build /app/dist ./dist
EXPOSE 3002
CMD ["bun", "dist/index.js"]