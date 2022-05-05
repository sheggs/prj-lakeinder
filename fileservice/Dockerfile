From node:16

WORKDIR /code


COPY package*.json ./
RUN npm install && mv node_modules ../

COPY . .

EXPOSE 3500

CMD ["node","server.js"]

