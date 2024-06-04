FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY ./backend.sln .
COPY ./backend/backend.csproj ./backend/

RUN dotnet restore

# copy everything else and build app
COPY ./backend ./backend/

WORKDIR /source/backend
RUN dotnet publish -c debug -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app ./

ENTRYPOINT ["dotnet", "backend.dll", "--urls", "http://+:5129"]