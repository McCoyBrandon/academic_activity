# Use an official Node.js runtime as a base image
FROM node:latest

# Set the working directory in the container
# WORKDIR /usr/src/app
WORKDIR /app

# # Create a directory for the app
# RUN mkdir -p /usr/src/app/AcademicTool

# # Set the working directory to the React app
# WORKDIR /usr/src/app/AcademicTool

# Copy package.json and package-lock.json to the working directory
 COPY Frontend/AcademicTool/package*.json ./
#COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the application code to the working directory
COPY Frontend/AcademicTool/ .
# COPY . .

# Build the React app (replace 'npm run' with the actual build script)
RUN npm run 

# Expose the port that the app will run on
EXPOSE 8080

# Define the command to run the application
CMD ["npm", "run", "dev"]