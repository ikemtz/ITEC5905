#!/bin/bash
set -ex

npx nx build itec5905 --configuration=development

docker build --pull \
    --rm \
    --build-arg APPLICATION_NAME=itec5905 \
    -f "..\..\..\docker\nginx.Dockerfile" \
    -t ikemtz/itec5905-nginx:latest ../../

docker image push ikemtz/itec5905-nginx:latest 
