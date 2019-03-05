FROM node:10
RUN mkdir -p /usr/src/app
WORKDIR ./web-client
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 3000
CMD npm start
