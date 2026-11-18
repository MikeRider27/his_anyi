# Build stage: compile the Vue app with Vite
FROM node:20-alpine AS build

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund --loglevel=error

COPY index.html vite.config.js ./
COPY public ./public
COPY src ./src
RUN npm run build

# Runtime stage: nginx serves the build and proxies data requests to the API
FROM nginx:1.27-alpine

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
