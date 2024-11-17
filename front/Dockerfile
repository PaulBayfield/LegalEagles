FROM node:22.11.0-alpine

# Installing pnpm
RUN npm install -g pnpm

# Copy the current directory contents into the container at /app
COPY . /app

# Remove node_modules
RUN rm -rf /app/node_modules

WORKDIR /app

# Install any needed packages specified in package.json
RUN pnpm install

# Build the app
RUN pnpm run build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Start the app
CMD ["pnpm", "start"]