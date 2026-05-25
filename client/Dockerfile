# ---------- BUILD STAGE ----------
FROM node:22-alpine AS builder

WORKDIR /client

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# ---------- PRODUCTION STAGE ----------
FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]