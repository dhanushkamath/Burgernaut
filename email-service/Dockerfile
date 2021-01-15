# The app was tested with Node v15.5.0
# So rather than using the 'latest' tag, it is safer to specify this particular version of node 
# for building the image. This can prevent compatibility issues with future releases of node.
FROM node:15.5.0

# Specify the working directory INSIDE the container
WORKDIR /usr/src/app

# Move the package.json and package-lock.json into the container to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the source code
COPY . .

# Start the node server
CMD ["npm", "start"]
