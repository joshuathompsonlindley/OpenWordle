#!/bin/bash
source /home/overflow/apps/OpenWordle/configuration.sh
exec /home/overflow/apps/OpenWordle/build/support/preprocessors/transform_env.py -f $(find bin/dist/openwordle_client -type f -name "*.ts")