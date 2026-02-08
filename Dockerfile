# Stage 1: Build frontend
FROM node:20-alpine AS frontend-build

WORKDIR /build/frontend
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Production backend
FROM node:20-alpine

WORKDIR /app/backend

# Install backend dependencies
COPY backend/package.json backend/package-lock.json* ./
RUN npm install --omit=dev

# Copy backend source
COPY backend/ ./

# Copy frontend build output
COPY --from=frontend-build /build/frontend/dist /app/frontend/dist

EXPOSE 3001

CMD ["node", "server.js"]
