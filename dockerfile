FROM huecker.io/library/node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --verbose
COPY . .
RUN npm run build

FROM huecker.io/library/node:18-alpine AS prod
WORKDIR /app
COPY --from=build /app/build /app/build
RUN npm install -g serve
EXPOSE 81
CMD ["serve", "-s", "build", "-l", "81"]

