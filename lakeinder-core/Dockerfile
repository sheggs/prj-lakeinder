FROM node:14

WORKDIR /code

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

COPY . . 

EXPOSE 6326

CMD ["node","server.js"]

