From node:16-alpine

WORKDIR /code

COPY package*.json ./

RUN apk update && apk add bash

RUN npm install --production --silent && mv node_modules ../

COPY . .

EXPOSE 3500

CMD ["node","server.js"]