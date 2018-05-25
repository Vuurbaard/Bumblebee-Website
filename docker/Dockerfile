FROM nginx:latest

# You have to build the app before building this image.
# This image solve purpose is to serve content

COPY docker/default.conf /etc/nginx/conf.d/
COPY dist /usr/share/nginx/html
