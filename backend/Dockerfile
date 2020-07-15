FROM node:10-alpine

COPY wait-for /usr/bin/
RUN chmod +x /usr/bin/wait-for

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm i
COPY / /app/

