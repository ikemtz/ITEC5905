FROM bitnami/nginx

ARG APPLICATION_NAME
EXPOSE 8080
RUN ls
COPY ["./apps/${APPLICATION_NAME}/nginx.conf", "/opt/bitnami/nginx/conf/server_blocks/my_server_block.conf"]
COPY ["./dist/apps/${APPLICATION_NAME}/", "/app"]
