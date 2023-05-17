FROM nginx

ARG APPLICATION_NAME
EXPOSE 8080
RUN ls
COPY ["./apps/${APPLICATION_NAME}/nginx.conf", "/etc/nginx/templates/nginx.conf.template"]
COPY ["./dist/apps/${APPLICATION_NAME}/", "/etc/nginx/html/"]
