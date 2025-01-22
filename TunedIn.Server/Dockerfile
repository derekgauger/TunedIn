FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
# Check if group/user exists before creating them
RUN if ! getent group app > /dev/null 2>&1; then \
    groupadd --system --gid 1000 app; \
    fi && \
    if ! getent passwd app > /dev/null 2>&1; then \
    useradd --system --uid 1000 --gid app app; \
    fi
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS with-node
RUN apt-get update
RUN apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash
RUN apt-get -y install nodejs

FROM with-node AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["TunedIn.Server/TunedIn.Server.csproj", "TunedIn.Server/"]
COPY ["tunedin.client/tunedin.client.esproj", "tunedin.client/"]
RUN dotnet restore "./TunedIn.Server/TunedIn.Server.csproj"
COPY . .
WORKDIR "/src/TunedIn.Server"
RUN dotnet build "./TunedIn.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./TunedIn.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TunedIn.Server.dll"]