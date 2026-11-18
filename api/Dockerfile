FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY api/package.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY api/server.js ./
# Seed data: the original JSON files from public/static/
COPY public/static/ ./seed/

EXPOSE 3000
CMD ["node", "server.js"]
