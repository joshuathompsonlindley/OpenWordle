#    Copyright 2022 Overflow Digital
#
#    Licensed under the Apache License, Version 2.0 (the "License");
#    you may not use this file except in compliance with the License.
#    You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS,
#    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#    See the License for the specific language governing permissions and
#    limitations under the License.

from os import environ
from os.path import join, abspath, dirname


class Config:
    DB_FILE = join(abspath(dirname(__file__)), "words/words.db")
    TXT_FILE = join(abspath(dirname(__file__)), "words/words.txt")
    SSL_DISABLE = True
    SECRET_KEY = environ.get('ow_secret')
    FLASK_APP = environ.get('ow_app')
    FLASK_BASE = environ.get('ow_base')
    HOST = environ.get('ow_host')
    PORT = environ.get('ow_port')
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = f'sqlite:///{DB_FILE}'

    GAMEBOARD_LENGTH = int(environ.get('GAMEBOARD_LENGTH', '5'))
    GAMEBOARD_ROW_LENGTH = int(environ.get('GAMEBOARD_ROW_LENGTH', '5'))

    CONTENT_SECURITY_POLICY = {
        "script-src-elem": [
            "'self'"
        ],
        "style-src-elem": [
            "'self'",
            "'unsafe-inline'"
        ]
    }
