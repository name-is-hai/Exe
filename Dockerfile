FROM node:21-alpine3.18 as BUILD_IMAGE
WORKDIR /app/exe-app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:21-alpine3.18 as PROD_IMAGE
WORKDIR /app/exe-app
COPY --from=BUILD_IMAGE /app/exe-app/dist/ /app/exe-app/dist/
EXPOSE 8888
COPY package.json .
COPY vite.config.ts .
RUN npm install typescript
CMD ["npm", "run", "preview"]