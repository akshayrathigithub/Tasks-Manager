# Use official Node.js image as the base image
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy the rest of the application
COPY . .

# Install dependencies
RUN npm install

# Expose port
EXPOSE 4002

# Command to run the application
CMD ["node", "server.js"]
