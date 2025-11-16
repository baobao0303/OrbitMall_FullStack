FROM alpine
WORKDIR /app

ADD build build
ADD services/mail-service/templates /app/templates

ENTRYPOINT build/mail-service

