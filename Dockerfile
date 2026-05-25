# --- Build ---
# Node compiles the Vite React app to static files. VITE_API_BASE_URL is
# baked into the bundle at build time, so it's passed as a build arg.
FROM node:22-alpine AS build
WORKDIR /app

# Cache deps separately from source — only re-installs when package.json changes
COPY package.json package-lock.json* ./
RUN npm ci

# Build-time env var: 
ARG VITE_API_BASE_URL=/api
ARG VITE_GOOGLE_MAPS_API_KEY
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY
ARG VITE_SENTRY_DSN=
ENV VITE_SENTRY_DSN=$VITE_SENTRY_DSN
COPY . .
RUN npm run build

# --- Runtime stage ---
# nginx image just serving the built static files. 
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove nginx welcome page
RUN rm -rf ./*

# Copy the built React app from the build stage
COPY --from=build /app/dist .

# Custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]