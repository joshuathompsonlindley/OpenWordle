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

from typing import Optional

from openwordle_server.test.context import OpenWordleContextTestCase
from openwordle_server.model import get_word_by_word, get_word_for_date, Words


class ModelTestCase(OpenWordleContextTestCase):
    def test_get_word_by_word_valid(self) -> None:
        with self.app.app_context():
            value: Optional[Words] = get_word_by_word(self.valid_word)

            self.assertIsNotNone(value)

    def test_get_word_by_word_invalid(self) -> None:
        with self.app.app_context():
            value: Optional[Words] = get_word_by_word('tests')

            self.assertIsNone(value)

    def test_get_word_for_date_valid(self) -> None:
        with self.app.app_context():
            value: str = get_word_for_date()
            not_expected_value: str = ''

            self.assertNotEqual(value, not_expected_value)
