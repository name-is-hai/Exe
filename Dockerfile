FROM node:21-alpine3.18 AS BUILD_IMAGE
WORKDIR /app/exe-app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:21-alpine3.18 AS PROD_IMAGE
WORKDIR /app/exe-app
COPY --from=BUILD_IMAGE /app/exe-app/dist/ /app/exe-app/dist/
EXPOSE 8888
COPY vite.config.ts .
RUN npm install vite @vitejs/plugin-react path
COPY package.json .
CMD ["npm", "run", "preview"]