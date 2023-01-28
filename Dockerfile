FROM node:16-alpine

RUN apk update && apk add bash \
    nano \
    tzdata \
    openrc \
    git \
    openssh

WORKDIR /var/www/html

COPY package.json /var/www/html

RUN npm install

ENV TZ="Asia/Jakarta"

COPY . /var/www/html

EXPOSE 8080

RUN cp /usr/share/zoneinfo/Asia/Jakarta /etc/localtime

RUN echo "Asia/Jakarta" > /etc/timezone

CMD ["/bin/bash", "-c", "npm start"]