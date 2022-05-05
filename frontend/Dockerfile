From node:16-alpine

WORKDIR /code

COPY package*.json ./

RUN apk update && apk add bash

RUN apk add libpq-dev

RUN apk add postgresql-client

RUN npm install --production --silent && mv node_modules ../

COPY . .

EXPOSE 3000

CMD ["npm","start"]