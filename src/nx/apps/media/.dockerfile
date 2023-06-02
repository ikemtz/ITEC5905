FROM bitnami/node
EXPOSE 3000
WORKDIR /app
RUN npm i tslib @nestjs/platform-express @nestjs/common @nestjs/core @nestjs/swagger @pinata/sdk 
COPY ["./dist/apps/media/", "/app/"]
CMD node main.js