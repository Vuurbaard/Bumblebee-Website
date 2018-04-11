#!/bin/bash
export ANGULAR_ENV=${ANGULAR_ENV:=dev}

NPM_INSTALL=${NPM_INSTALL_AFTER:=true}

if [ $NPM_INSTALL = "true" ]; then
    echo "Running NPM Install"
    npm install
fi
echo "Starting build" 
mkdir -p /var/log/ng/ && touch /var/log/ng/build.log
mkdir -p /var/www/html/dist/
echo "Website is building.... please wait" > /var/www/html/index.html
echo "Starting ng build with following extra options: ${NG_OPTIONAL}"
(ng build ${NG_OPTIONAL} --environment=${ANGULAR_ENV} >> /var/log/ng/build.log) &
echo "There is a possibility that ng build failed, can't tell."

echo "Starting Apache2"
nohup apachectl -D FOREGROUND &

echo "Everything ready! Showing build.log from ng"
cat /var/log/ng/build.log

echo "tailing build.log"
tail -f /var/log/ng/build.log