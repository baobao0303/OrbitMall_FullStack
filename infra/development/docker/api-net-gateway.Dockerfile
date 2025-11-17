FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["services/api-net-gateway/RideSharing.Api/RideSharing.Api.csproj", "services/api-net-gateway/RideSharing.Api/"]
COPY ["services/api-net-gateway/RideSharing.Application/RideSharing.Application.csproj", "services/api-net-gateway/RideSharing.Application/"]
COPY ["services/api-net-gateway/RideSharing.Infrastructure/RideSharing.Infrastructure.csproj", "services/api-net-gateway/RideSharing.Infrastructure/"]
COPY ["services/api-net-gateway/RideSharing.Persistence/RideSharing.Persistence.csproj", "services/api-net-gateway/RideSharing.Persistence/"]
COPY ["services/api-net-gateway/RideSharing.Common/RideSharing.Common.csproj", "services/api-net-gateway/RideSharing.Common/"]
COPY ["services/api-net-gateway/RideSharing.Contracts/RideSharing.Contracts.csproj", "services/api-net-gateway/RideSharing.Contracts/"]

RUN dotnet restore "services/api-net-gateway/RideSharing.Api/RideSharing.Api.csproj"
COPY . .
WORKDIR "/src/services/api-net-gateway/RideSharing.Api"
RUN dotnet build "RideSharing.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RideSharing.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RideSharing.Api.dll"]
