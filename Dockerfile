FROM node:14 as build

WORKDIR /app

COPY front-website/package*.json ./

RUN npm install

COPY front-website/ .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
