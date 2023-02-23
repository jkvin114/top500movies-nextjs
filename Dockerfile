
FROM node:latest as base
WORKDIR /src
#COPY ["package.json", "package-lock.json*", "./"]
COPY package*.json ./

FROM base as dev
ENV NODE_ENV=development
RUN npm ci
COPY . .
CMD [ "npm", "run", "dev" ]