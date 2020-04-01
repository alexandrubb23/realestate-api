# NodeJS v12
FROM node:12

# App working directory
WORKDIR /var/www/api

# Copy package json into working directory
COPY src/package.json .

# Copy all files and folder
COPY . .

# Install all node dependencies
RUN npm install

# Start API
CMD ["npm", "start"]