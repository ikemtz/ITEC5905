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