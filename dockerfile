FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run lint
RUN npm test
RUN npm run build

FROM node:18-alpine AS prod
WORKDIR /app
COPY --from=build /app/build /app/build
RUN npm install -g serve
EXPOSE 81
CMD ["serve", "-s", "build", "-l", "81"]

