
FROM node:18-alpine as base
WORKDIR /src
#COPY ["package.json", "package-lock.json*", "./"]
COPY package*.json ./
EXPOSE 3000
FROM base as dev
ENV NODE_ENV=development
RUN npm ci
COPY . .
CMD [ "npm", "run", "dev" ]