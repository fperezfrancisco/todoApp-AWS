FROM node:16

  # Set working directory inside the container
  WORKDIR /app

  # Copy package.json and package-lock.json for dependency installation
  COPY package*.json ./

  # Install dependencies
  RUN npm install --build-from-source

  # Copy the rest of the application code
  COPY . .

  # Expose the port the service uses
  EXPOSE 4001

  # Command to start the service
  CMD ["node", "src/index.js"]