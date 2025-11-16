FROM alpine
WORKDIR /app

ADD shared shared
ADD build build
ADD services/auth/migrations /app/migrations

ENTRYPOINT build/auth

