FROM bitnami/dotnet-sdk:6 AS publish
ARG DOMAIN_NAME
ENV DOMAIN_NAME=${DOMAIN_NAME}
ARG BUILD_TYPE
ENV BUILD_TYPE=${BUILD_TYPE}
WORKDIR /src 
COPY ["ITEC5905.${DOMAIN_NAME}.OData", "ITEC5905.${DOMAIN_NAME}.OData/"]
COPY ["ITEC5905.${DOMAIN_NAME}.WebApi", "ITEC5905.${DOMAIN_NAME}.WebApi/"]
COPY ["ITEC5905.${DOMAIN_NAME}.Models", "ITEC5905.${DOMAIN_NAME}.Models/"]
RUN dotnet publish "./ITEC5905.${DOMAIN_NAME}.${BUILD_TYPE}/ITEC5905.${DOMAIN_NAME}.${BUILD_TYPE}.csproj" --sc -c Release -r linux-x64 -o /app/publish
RUN cat <<< "#!/bin/bash" >> /app/publish/entrypoint.sh && \
    cat <<< "set -ex" >> /app/publish/entrypoint.sh && \
    cat <<< "dotnet ITEC5905.$DOMAIN_NAME.$BUILD_TYPE.dll" >> /app/publish/entrypoint.sh

FROM registry.access.redhat.com/ubi8/dotnet-70-runtime AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://*:5000
EXPOSE 5000
ENTRYPOINT ["sh", "entrypoint.sh"]
