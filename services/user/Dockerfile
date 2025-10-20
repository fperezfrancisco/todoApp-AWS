# Use a lightweight Node.js base image
  FROM node:18-alpine

  # Set working directory inside the container
  WORKDIR /app

  # Copy package.json and package-lock.json for dependency installation
  COPY package*.json ./

  # Install dependencies
  RUN npm install

  # Copy the rest of the application code
  COPY . .

  # Expose the port the service uses
  EXPOSE 4000

  # Command to start the service
  CMD ["node", "src/index.js"]