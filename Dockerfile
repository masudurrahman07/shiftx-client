# Multi-stage Docker build for a Vite React frontend.
# Stage 1 builds the production assets with Node.js.
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency manifests first so Docker can cache installs.
COPY package*.json ./

# Install dependencies exactly as the CI workflow does.
RUN npm install

# Copy the rest of the source code.
COPY . .

# Build the production bundle for deployment.
RUN npm run build

# Stage 2 serves the built files with Nginx.
FROM nginx:1.27-alpine AS production

# Copy the built application into Nginx's public directory.
COPY --from=builder /app/dist /usr/share/nginx/html

# Configure Nginx to support client-side routing for a React SPA.
RUN printf '%s\n' \
  'server {' \
  '    listen 80;' \
  '    server_name _;' \
  '    root /usr/share/nginx/html;' \
  '    index index.html;' \
  '    location / {' \
  '        try_files $uri $uri/ /index.html;' \
  '    }' \
  '}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start Nginx in the foreground so the container stays running.
CMD ["nginx", "-g", "daemon off;"]
