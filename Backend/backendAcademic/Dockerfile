# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY Backend/backendAcademic/package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend application to the working directory
COPY Backend/backendAcademic/ .

# Expose the port on which the application will run
EXPOSE 8080

# Command to run the application
CMD ["node", "index"]
