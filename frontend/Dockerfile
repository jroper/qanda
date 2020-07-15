FROM nginx:1.17.6-alpine

RUN rm -Rf /usr/share/nginx/html
COPY public /usr/share/nginx/html

COPY docker/nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
