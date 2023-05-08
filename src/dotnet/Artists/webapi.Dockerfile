#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM bitnami/dotnet-sdk:latest AS publish
WORKDIR /src
COPY ["ITEC5905.Artists.WebApi/ITEC5905.Artists.WebApi.csproj", "ITEC5905.Artists.WebApi/"]
COPY ["ITEC5905.Artists.Models/ITEC5905.Artists.Models.csproj", "ITEC5905.Artists.Models/"]
RUN dotnet restore "ITEC5905.Artists.WebApi/ITEC5905.Artists.WebApi.csproj"
COPY . .
WORKDIR "/src/ITEC5905.Artists.WebApi"
RUN dotnet publish "ITEC5905.Artists.WebApi.csproj" -c Release -o /app/publish

FROM bitnami/aspnet-core:latest AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ITEC5905.Artists.WebApi.dll"]