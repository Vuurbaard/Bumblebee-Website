FROM node:latest
ARG NPM_INSTALL_BEFORE=true

RUN apt-get update -qq && apt-get install apache2 -qq -y && rm -r /var/lib/apt/lists/*
# Enable rewrite module
RUN a2enmod rewrite && a2enmod headers

# Fix stupid angular CLI stuff
RUN yarn global add node-gyp
RUN yarn global add @angular/cli

COPY ${DOCKER_SRC}package.json /tmp/package.json
RUN if [ $NPM_INSTALL_BEFORE = "true" ]; then \
    ls /tmp && \
    cd /tmp && \
    npm install && \
    mkdir -p /var/www/html && cp -a /tmp/node_modules /var/www/html ; \
    fi
# Default directory to work in
RUN mkdir -p /var/www/html
WORKDIR /var/www/html
COPY ./ /var/www/html
RUN ls /var/www/html
COPY "docker/apache2.conf" /etc/apache2/apache2.conf
COPY "docker/start.sh" /var/www/start.sh
RUN chmod +x /var/www/start.sh
CMD bash /var/www/start.sh 