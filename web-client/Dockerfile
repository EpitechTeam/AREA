FROM node:10

WORKDIR ./web-client
COPY package.json .

RUN npm install

#uncomment to debug
# RUN npm install -g http-server

COPY . ./

# EXPOSE 7200
CMD npm start
# CMD http-server ../../ -p 7200 -a 0.0.0.0
