FROM node:12

# Create app directory
# RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/office-employee-back

# Installing dependencies
COPY office-employee-back/package*.json ./
COPY office-employee-back/yarn.lock ./
RUN yarn install

# Copying source files
# COPY . .

# Building app
# RUN npm run build
EXPOSE 3000

# Running the app
CMD ["yarn", "dev"]
