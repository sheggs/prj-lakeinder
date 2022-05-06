From node:16-alpine

WORKDIR /code

COPY package*.json ./
COPY wait-for-it.sh /code
COPY wait-for-it.sh ../
COPY wait-for-it.sh ./

RUN apk update && apk add bash

RUN apk add libpq-dev

RUN apk add postgresql-client

RUN npm install --production --silent && mv node_modules ../

RUN chmod +x wait-for-it.sh
RUN sed -i -e 's/\r$//' wait-for-it.sh

COPY . .

EXPOSE 6326

CMD ["node","server.js"]
