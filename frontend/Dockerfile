# ---- Stage 1: Build ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Vite bakes VITE_* vars into the bundle at build time.
# Pass it in as a build arg so it's not hardcoded.
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build
# Vite outputs static files to /app/dist

# ---- Stage 2: Serve ----
FROM nginx:alpine

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy built static files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Custom nginx config (see below)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]