FROM node:10
RUN mkdir -p /usr/src/app
WORKDIR ./web-client
COPY package.json .
RUN npm install
RUN npm install -g http-server
COPY . ./
EXPOSE 3000
EXPOSE 7200
CMD npm start
CMD http-server ../../ -p 7200 -a 0.0.0.0
