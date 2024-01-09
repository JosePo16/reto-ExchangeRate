FROM node:18-alpine

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm i

EXPOSE 3000

ENTRYPOINT npm start