FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY Basic_Website/ .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
