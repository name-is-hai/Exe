FROM node:21-alpine3.18 AS BUILD_IMAGE
WORKDIR /app/exe-app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:21-alpine3.18 AS PROD_IMAGE
WORKDIR /app/exe-app
COPY --from=BUILD_IMAGE /app/exe-app/dist/ /app/exe-app/dist/
RUN npm install -g serve
EXPOSE 8888
CMD ["serve", "-s" ,"-p", "8888", "/app/exe-app/dist"]
