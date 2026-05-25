# ---------- BUILD STAGE ----------
FROM node:22-alpine AS builder

WORKDIR /worker

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# ---------- PRODUCTION STAGE ----------
FROM node:22-alpine

WORKDIR /worker

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /worker/dist ./dist

CMD ["npm", "run", "start"]