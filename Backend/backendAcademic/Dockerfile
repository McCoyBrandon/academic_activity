# Use an official Node.js runtime as a base image
FROM node:latest


# Set the working directory in the container
WORKDIR /usr/src/app

# # Create a directory for the app
# RUN mkdir -p /usr/backendAcademic

# # Set the working directory to the React app
# WORKDIR /usr/backendAcademic

# Copy package.json and package-lock.json to the working directory
COPY Backend/backendAcademic/package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend application to the working directory
COPY Backend/backendAcademic/ .

# Expose the port on which the application will run
EXPOSE 5038

# Command to run the application
CMD ["node", "index"]
