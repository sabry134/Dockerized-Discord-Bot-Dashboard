# Use an official Node.js runtime as a parent image for building
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY front-website/package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY front-website/ .

# Build the React app
RUN npm run build

# Use a lightweight Nginx image to serve the built React app
FROM nginx:alpine

# Copy the built React app from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the web server to listen on (Nginx default)
EXPOSE 80

# Start Nginx to serve the React app in the foreground
CMD ["nginx", "-g", "daemon off;"]
