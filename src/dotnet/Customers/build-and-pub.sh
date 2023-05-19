#!/bin/bash
set -ex

cd ./ITEC5905.Customers.Migrations
./reset-migrations.sh
cd ..

docker build --pull \
    --rm \
    --build-arg DOMAIN_NAME=Customers \
    --build-arg BUILD_TYPE=OData \
    -f "..\..\docker\microservice.Dockerfile" \
    -t ikemtz/itec5905-customers-odata:latest .

docker image push ikemtz/itec5905-customers-odata:latest 


docker build --pull \
    --rm \
    --build-arg DOMAIN_NAME=Customers \
    --build-arg BUILD_TYPE=WebApi \
    -f "..\..\docker\microservice.Dockerfile" \
    -t ikemtz/itec5905-customers-webapi:latest .

docker image push ikemtz/itec5905-customers-webapi:latest 


docker build --pull \
    --rm \
    --build-arg DOMAIN_NAME=Customers \
    --build-arg DB_NAME=customers \
    -f "..\..\docker\mysql.Dockerfile" \
    -t ikemtz/itec5905-customers-db:latest .

docker image push ikemtz/itec5905-customers-db:latest

kubectl rollout restart deployment/customers-db
kubectl rollout restart deployment/customers-odata
kubectl rollout restart deployment/customers-webapi