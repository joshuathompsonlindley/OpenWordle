#!/bin/bash

# ==============================
# OpenWordle Configuration File
# ==============================


# ==============================
# Deployment Options
# ==============================

# The url the game gets exposed to
export URL=''
# Flask secret key
export SECRET_KEY=
# Internal server host and port
export HOST=127.0.0.1
export PORT=5000


# ==============================
# Game Options
# ==============================

# Amount of rows available on the gameboard
export GAMEBOARD_LENGTH=6
# Amount of individual cells in a row
export GAMEBOARD_ROW_LENGTH=5
# Game title and name
export GAME_TITLE='OpenWordle'
# Game description
export GAME_DESCRIPTION='OpenWordle'
# Messages displayed on game over
export WIN_MESSAGE='You won'
export LOSE_MESSAGE='You lost'

# ==============================
# Compile Options
# Only change if you need to!
# ==============================

# Local cache for npm
export npm_config_cache="node_cache"
# Skip certain steps in the build pipeline
export quick_build="false"