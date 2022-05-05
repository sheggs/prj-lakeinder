From node:16
RUN apt-get update
RUN apt-get install libpq-dev
RUN apt-get install -y postgresql-client

WORKDIR /code


COPY package*.json ./
COPY wait-for-it.sh /code

RUN npm install --production --silent && mv node_modules ../



RUN chmod +x wait-for-it.sh

COPY . .

EXPOSE 6584

CMD ["node","server.js"]

