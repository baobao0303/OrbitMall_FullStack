@echo off
set CGO_ENABLED=0
set GOOS=linux
set GOARCH=amd64
cd services\auth
go build -o ..\..\build\auth .\cmd\api

