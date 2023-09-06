# Stage 1: Build the app
FROM node:18-alpine as simple-build

WORKDIR /app
COPY package*.json /app/
COPY yarn.lock /app/

# Install dependencies
RUN apk update && apk add --no-cache nodejs yarn
RUN yarn install

# Copy the rest of the app's source code
COPY . /app/

# Install vite globally
RUN yarn global add vite

# Build the app for production
RUN yarn build

# Stage 2: Serve the app with nginx
FROM nginx:alpine

# Copy the production-ready files from Vite's output directory
COPY --from=simple-build /app/dist /usr/share/nginx/html

# Copy the nginx configuration
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose the appropriate port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]