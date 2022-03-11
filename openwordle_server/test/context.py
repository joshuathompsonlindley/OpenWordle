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

from typing import NamedTuple
from unittest import TestCase

from flask import Flask
from flask.testing import FlaskClient

from openwordle_server.main import create_app
from openwordle_server.config import Config


class OpenWordleContextTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = create_app()  # type: Flask
        cls.valid_word = ''  # type: str

        with open(Config.TXT_FILE, 'r', encoding='UTF-8') as file:
            cls.valid_word = file.readline()
            cls.valid_word = cls.valid_word.replace('\n', '')
            cls.valid_word = cls.valid_word.lower()


class OpenWordleApiTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = create_app(is_testing=True)  # type: Flask
        cls.api = cls.app.test_client()  # type: FlaskClient


class ApiResponse(NamedTuple):
    response_code: int
    response_txt: str
