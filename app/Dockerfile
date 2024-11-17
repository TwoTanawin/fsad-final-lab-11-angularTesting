# Stage 1: Build the Angular app
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application source and build it
COPY . .
RUN npm run build -- --configuration production --base-href "/"

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the Angular build output to Nginx's default directory
COPY --from=build /app/dist/students-app /usr/share/nginx/html

# Optional: Custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
