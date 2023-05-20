#!/bin/bash
set -ex
cd ./ITEC5905.Artists.Migrations
export DbConnectionString="server=localhost;user=mysql;port=3306;"
dotnet ef migrations script --context DatabaseContext --idempotent --output ../ITEC5905.Artists.Db/migration.sql
cd ..

docker build --pull \
    --rm \
    --build-arg DOMAIN_NAME=Artists \
    --build-arg BUILD_TYPE=OData \
    -f "..\..\docker\microservice.Dockerfile" \
    -t ikemtz/itec5905-artists-odata:latest .

docker image push ikemtz/itec5905-artists-odata:latest 


docker build --pull \
    --rm \
    --build-arg DOMAIN_NAME=Artists \
    --build-arg BUILD_TYPE=WebApi \
    -f "..\..\docker\microservice.Dockerfile" \
    -t ikemtz/itec5905-artists-webapi:latest .

docker image push ikemtz/itec5905-artists-webapi:latest 

docker build --pull \
    --rm \
    --build-arg DOMAIN_NAME=Artists \
    --build-arg DB_NAME=artists \
    -f "..\..\docker\mysql.Dockerfile" \
    -t ikemtz/itec5905-artists-db:latest .

docker image push ikemtz/itec5905-artists-db:latest

kubectl rollout restart deployment/artists-db
kubectl rollout restart deployment/artists-odata
kubectl rollout restart deployment/artists-webapi