FROM oven/bun:latest AS api-gateway-build
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
RUN bun run build

FROM oven/bun:latest
WORKDIR /app
COPY --from=api-gateway-build /app/dist ./dist
EXPOSE 3000
CMD ["bun", "dist/index.js"]