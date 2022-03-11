#!/bin/bash

set -e
set -x

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
SCRIPTPATH=$(dirname "$SCRIPTPATH../")

source $SCRIPTPATH/configuration.sh

case "$1" in 
    -b)
        flake8 $(git ls-files '*.py')
        mypy --show-error-codes --pretty --ignore-missing-imports --disable-error-code attr-defined $(git ls-files '*.py')
        pylint --rcfile=ci/.pylintrc $(git ls-files '*.py')
        safety check --full-report -i 40459        
        ;;
    -f)
        npm ci
        npx eslint -c openwordle_client/.eslintrc.json $(git ls-files '*.ts')
        cd openwordle_client
        npx tsc
        ;;
esac