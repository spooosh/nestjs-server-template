# build app
FROM node:10-alpine AS admin
ARG BACKEND_URL
ENV REACT_APP_BACKEND_URL=${BACKEND_URL}

WORKDIR /app
COPY package.json package-lock.json /app/

RUN npm i
COPY . /app/
RUN npm run build

# share with nginx
FROM nginx:1.19-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=admin /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
