FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["services/api-net-gateway/OrbitMall.Api/OrbitMall.Api.csproj", "services/api-net-gateway/OrbitMall.Api/"]
COPY ["services/api-net-gateway/OrbitMall.Application/OrbitMall.Application.csproj", "services/api-net-gateway/OrbitMall.Application/"]
COPY ["services/api-net-gateway/OrbitMall.Domain/OrbitMall.Domain.csproj", "services/api-net-gateway/OrbitMall.Domain/"]
COPY ["services/api-net-gateway/OrbitMall.Infrastructure/OrbitMall.Infrastructure.csproj", "services/api-net-gateway/OrbitMall.Infrastructure/"]
COPY ["services/api-net-gateway/OrbitMall.Persistence/OrbitMall.Persistence.csproj", "services/api-net-gateway/OrbitMall.Persistence/"]
COPY ["services/api-net-gateway/OrbitMall.Common/OrbitMall.Common.csproj", "services/api-net-gateway/OrbitMall.Common/"]
COPY ["services/api-net-gateway/OrbitMall.Contracts/OrbitMall.Contracts.csproj", "services/api-net-gateway/OrbitMall.Contracts/"]

RUN dotnet restore "services/api-net-gateway/OrbitMall.Api/OrbitMall.Api.csproj"
COPY . .
WORKDIR "/src/services/api-net-gateway/OrbitMall.Api"
RUN dotnet build "OrbitMall.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "OrbitMall.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "OrbitMall.Api.dll"]
