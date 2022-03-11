#!/bin/bash

set -e
set -x


SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
SCRIPTPATH=$(dirname "$SCRIPTPATH../")

source $SCRIPTPATH/configuration.sh

sudo apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
npm i
python -m pip install --upgrade pip
pip install -r $SCRIPTPATH/requirements.txt
python $SCRIPTPATH/openwordle_server/words/generate.py