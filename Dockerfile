# Build stage
FROM node:23.6.0 AS builder
WORKDIR /code

# Copy package files first (better caching for dependencies)
COPY package.json package-lock.json ./
# RUN npm ci --omit=dev
RUN npm install

# Copy source and build Next.js
COPY . .
RUN npm run build

# Production stage
FROM node:23.6.0 AS production
WORKDIR /app

# Copy only required files
COPY --from=builder /code/package.json ./package.json
COPY --from=builder /code/node_modules ./node_modules
COPY --from=builder /code/public ./public
COPY --from=builder /code/.next ./.next
COPY --from=builder /code/next.config.mjs ./next.config.mjs

# Expose app port
EXPOSE 3000

# Run Next.js in production mode
CMD ["npm", "run", "start"]
