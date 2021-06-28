FROM node:12
WORKDIR /app

COPY package.json /app
RUN npm install
COPY ./src/dist /app

CMD yarn start:docker
