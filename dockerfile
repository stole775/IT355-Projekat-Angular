# Step 1: Use the official Node.js image to run the Angular app
FROM node:16

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Expose port 4200 (used by ng serve)
EXPOSE 4200

# Step 7: Start the Angular app using ng serve for development
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--disable-host-check"]


# docker build -t angular .

# docker run -p 4200:80 angular

#ng serve --host 0.0.0.0 --disable-host-check
