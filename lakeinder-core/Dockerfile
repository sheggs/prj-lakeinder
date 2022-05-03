FROM node:18

WORKDIR /code

RUN apt-get update -y
RUN apt-get install -y build-essential libpq-dev
RUN apt-get install libpq-dev
RUN apt-get install -y postgresql-client

COPY package.json ./
COPY package-lock.json ./
COPY wait-for-it.sh .

RUN chmod +x wait-for-it.sh

RUN npm install --silent

COPY . . 

EXPOSE 6326

CMD ["node","server.js"]

