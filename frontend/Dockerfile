FROM oven/bun:latest AS frontend
WORKDIR /app
RUN mkdir frontend
COPY shared ./shared
COPY frontend/package*.json frontend/bun.lock ./frontend/
WORKDIR /app/frontend/
RUN bun install
COPY ./frontend .
RUN ls -a
RUN bun run build

FROM oven/bun:latest
WORKDIR /app
COPY --from=frontend /app/frontend/dist ./dist
EXPOSE 5173
CMD [ "bunx", "serve", "-p", "5173", "./dist" ]
