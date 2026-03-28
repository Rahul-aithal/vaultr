FROM oven/bun:1 AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json ./
COPY bun.lock ./
RUN bun install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build args
# Use secrets during build only
RUN --mount=type=secret,id=env \
    echo "----ENV FILE----" && \
    cat -A /run/secrets/env && \
    echo "--------------" && \
    set -a && \
    . /run/secrets/env && \
    set +a && \
    echo "MINIO_ENDPOINT=$MINIO_ENDPOINT" && \
    echo "BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET" && \
    bun run build


# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["bun", "server.js"]
