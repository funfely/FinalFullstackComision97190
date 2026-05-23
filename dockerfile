# --- Etapa 1: Build de dependencias ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# --- Etapa 2: Entorno de producción ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/src ./src

EXPOSE 8080
CMD ["node", "src/app.js"]