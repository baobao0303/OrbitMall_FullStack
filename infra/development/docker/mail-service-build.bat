@echo off
cd services\mail-service
set CGO_ENABLED=0
set GOOS=linux
set GOARCH=amd64
go build -o ..\..\build\mail-service .\cmd\api
cd ..\..

