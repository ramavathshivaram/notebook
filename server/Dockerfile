# ---------- BUILD STAGE ----------
FROM node:25-alpine AS builder

WORKDIR /server

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# ---------- PRODUCTION STAGE ----------
FROM node:22-alpine

WORKDIR /server

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /server/dist ./dist

CMD ["npm", "run", "start"]