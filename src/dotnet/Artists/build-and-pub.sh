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