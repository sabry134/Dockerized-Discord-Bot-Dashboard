FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY Website/ .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
