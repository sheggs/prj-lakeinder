From node:16
RUN apt-get update
RUN apt-get install libpq-dev
RUN apt-get install -y postgresql-client

WORKDIR /code


COPY package*.json ./

RUN npm install && mv node_modules ../




COPY . .

EXPOSE 3000

CMD ["npm","start"]

