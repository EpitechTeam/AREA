FROM node:7.7.2-alpine

WORKDIR /usr/app

COPY server/package.json ./ server/node_modules

COPY . .
