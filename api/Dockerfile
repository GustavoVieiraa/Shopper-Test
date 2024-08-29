# syntax=docker/dockerfile:1

FROM node:latest

WORKDIR /api

COPY . .

RUN npm i

CMD ["npm", "start"]

EXPOSE 3000