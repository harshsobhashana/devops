# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Install a lightweight web server (serve)
RUN npm install -g serve

# Expose the port to the outside world
EXPOSE 3000

# Serve the React app
CMD ["serve", "-s", "dist"]
