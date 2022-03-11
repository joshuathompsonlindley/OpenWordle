#!/bin/bash

set -e
set -x

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
SCRIPTPATH=$(dirname "$SCRIPTPATH../")

source $SCRIPTPATH/configuration.sh

case "$1" in 
    -u)
        python3 -m unittest discover openwordle_server/test/unit
        ;;
    -i)
        python3 -m unittest discover openwordle_server/test/integration
        ;;
    -e)
        cd $SCRIPTPATH
        npx cypress run
        ;;
esac