# Stage 1: Build the React app
FROM node:18-alpine AS react-build

# Set working directory inside the container
WORKDIR /app

# Copy React app files
COPY ./client/package*.json ./client/
WORKDIR /app/client
RUN npm install

COPY ./client ./client
RUN npm run build

# Stage 2: Set up the Node.js backend and serve the React app
FROM node:18-alpine

# Set working directory for backend
WORKDIR /app

# Copy backend package files and install dependencies
COPY ./package*.json ./
RUN npm install

# Copy backend source files
COPY ./src ./src

# Copy the React app build from Stage 1
COPY --from=react-build /app/client/build ./client/build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "src/index.js"]
