# ---- Backend Dockerfile ----
FROM node:20-alpine

WORKDIR /app

# Copy dependency manifests first (better layer caching)
COPY package*.json ./

# Install only production deps (skip nodemon etc. via --omit=dev)
RUN npm ci --omit=dev

# Copy the rest of the source
COPY . .

# Backend reads PORT from env; expose the default for documentation
EXPOSE 3000

# Never bake real secrets into the image — these come from
# Kubernetes ConfigMap/Secret at deploy time, not from here
CMD ["node", "index.js"]