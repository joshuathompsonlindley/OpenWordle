#!/bin/bash

if [ "$EUID" -ne 0 ]; then
  echo -e"Please run as root or sudo."
  exit
fi

clear

set -e
set -x

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
SCRIPTPATH=$(dirname "$SCRIPTPATH../")

cd $SCRIPTPATH
source configuration.sh

function user_does_not_exist() {
    if id "$1" >/dev/null 2>&1; then
        return 1
    else
        return 0
    fi
}

function not_in_install_folder() {
    if [ "$SCRIPTPATH" = /home/overflow/apps/OpenWordle ]; then 
        return 1
    else
        return 0
    fi
}

function create_overflow_user() {
    useradd -m overflow
    cd /home/
    chgrp overflow overflow
    usermod -aG overflow `$(echo whoami)`
    chmod -R 755 overflow
    setfacl -d -m group:overflow:rwx overflow
    setfacl -d -m group:overflow:rwx overflow
    chmod g+s overflow
    mkdir -p /home/overflow/apps/OpenWordle
}

function install_to_folder() {
    cd $SCRIPTPATH

    mkdir -p /home/overflow/apps/OpenWordle
    mv -f * /home/overflow/apps/OpenWordle
    mv -f .gitignore /home/overflow/apps/OpenWordle/.gitignore
    mv -f .github /home/overflow/apps/OpenWordle/.github
    mv -f .git /home/overflow/apps/OpenWordle/.git

    cd /home/overflow/apps
    chown -R overflow:overflow OpenWordle
    SCRIPTPATH=/home/overflow/apps/OpenWordle
}

function verify() {
    apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
    apt-get install -y npm nginx python3 certbot
    npm i
    pip3 install -r /home/overflow/apps/OpenWordle/requirements.txt
    flake8 $(git ls-files '*.py')
    mypy --show-error-codes --pretty --ignore-missing-imports --disable-error-code attr-defined $(git ls-files '*.py')
    pylint --rcfile=ci/.pylintrc $(git ls-files '*.py')
}

function create_dist() {
    cd $SCRIPTPATH
    
    rm -rf bin/dist/

    mkdir -p bin/dist/

    cd $SCRIPTPATH

    cp -rf openwordle_client/ bin/dist/
    cp -rf openwordle_server bin/dist/
    cp -rf openwordle.py bin/dist/
    cp -rf configuration.sh bin/dist/
    cp -rf node_cache/ bin/dist/
    cp -rf node_modules/ bin/dist/
    cp -rf package-lock.json bin/dist/
    cp -rf requirements.txt bin/dist

    build/support/preprocess.sh

    cd bin/dist

    mkdir -p openwordle_server/templates openwordle_server/static openwordle_server/static/component

    cd openwordle_client

    npx tsc

    cd ../

    cp -f openwordle_client/build/*.js openwordle_server/static
    cp -f openwordle_client/build/*.js.map openwordle_server/static
    cp -f openwordle_client/build/component/*.js openwordle_server/static/component
    cp -f openwordle_client/build/component/*.js.map openwordle_server/static/component
    cp -f openwordle_client/app.html openwordle_server/templates/index.html
    cp -f openwordle_client/logo.png openwordle_server/static/logo.png
    cp -f openwordle_client/favicon.ico openwordle_server/static/favicon.ico

    cd $SCRIPTPATH
}

function install_services() {
    set +e

    systemctl stop nginx
    systemctl stop OpenWordle

    set -e

    cp -f build/support/OpenWordle.nginx.config build/support/OpenWordle.nginx.config.t
    sed -i -e "s/{URL}/${URL}/g" build/support/OpenWordle.nginx.config.t
    sed -i -e "s/{HOST}/${HOST}/g" build/support/OpenWordle.nginx.config.t
    sed -i -e "s/{PORT}/${PORT}/g" build/support/OpenWordle.nginx.config.t
    cp -f build/support/OpenWordle.service /etc/systemd/system/OpenWordle.service
    cp -f build/support/OpenWordle.nginx.config.t /etc/nginx/sites-available/${URL}
    rm -f /etc/nginx/sites-enabled/${URL}
    ln -s /etc/nginx/sites-available/${URL} /etc/nginx/sites-enabled/
    rm -f build/support/OpenWordle.nginx.config.t
    systemctl start nginx

    certbot --nginx --keep --agree-tos --hsts -n -q -d ${URL} -d www.${URL}
    sed -i "s/listen 443 ssl;/listen 443 ssl http2;/" /etc/nginx/sites-available/${URL}

    systemctl daemon-reload
    systemctl restart nginx
    systemctl start OpenWordle
}

if user_does_not_exist overflow; then
    create_overflow_user
fi

if not_in_install_folder ; then
    install_to_folder
fi

if [ "$quick_build" != "true" ] ; then
    verify
fi

create_dist
install_services