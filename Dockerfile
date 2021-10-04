FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# RUN npm run build:backend
# RUN npm run build:frontend

# If you are building your code for production
# RUN npm ci --only=production

COPY ./dist .
COPY ./config ./config
COPY ./public ./public

EXPOSE 3000

CMD [ "node", "index.js" ]