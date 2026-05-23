# --- Etapa 1: Build de dependencias ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# --- Etapa 2: Entorno de producción ultra ligero ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --from=builder /app/src ./src

EXPOSE 8080
CMD ["node", "src/app.js"]