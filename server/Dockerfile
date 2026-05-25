# ---------- BUILD STAGE ----------
FROM node:22-alpine AS builder

WORKDIR /server

COPY package*.json ./
RUN npm ci

COPY . .
# RUN npm run build


# # ---------- PRODUCTION STAGE ----------
# FROM node:22-alpine

# WORKDIR /server

# ENV NODE_ENV=production

# COPY package*.json ./
# RUN npm ci --omit=dev

# COPY --from=builder /server/dist ./dist

EXPOSE 8080

CMD ["npm", "run", "dev"]