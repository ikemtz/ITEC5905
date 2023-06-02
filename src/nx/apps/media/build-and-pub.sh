#!/bin/bash
set -ex
npx nx serve media & sleep 30
ps | grep node |  awk '{print $1}' | xargs kill
cp ./swagger.json ./src/assets
npx nx build media --configuration=development

docker build --pull \
    --rm \
    -f "./.dockerfile" \
    -t ikemtz/itec5905-media:latest ../../

docker image push ikemtz/itec5905-media:latest 

kubectl rollout restart deployment/media-webapi