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

from datetime import datetime, timedelta

from openwordle_server.test.context import OpenWordleContextTestCase

from openwordle_server.util import is_word_valid, is_expired


class UtilsTestCase(OpenWordleContextTestCase):
    def test_is_valid_word_true(self) -> None:
        with self.app.app_context():
            value: bool = is_word_valid(self.valid_word)

            self.assertTrue(value)

    def test_is_valid_word_false(self) -> None:
        with self.app.app_context():
            value: bool = is_word_valid('tests')

            self.assertFalse(value)

    def test_is_expired_true_past(self) -> None:
        current_date: datetime = datetime.today()
        current_date -= timedelta(days=1)
        date_string: str = current_date.strftime('%Y%m%d')
        value: bool = is_expired(date_string)

        self.assertTrue(value)

    def test_is_expired_true_future(self) -> None:
        current_date: datetime = datetime.today()
        current_date += timedelta(days=1)
        date_string: str = current_date.strftime('%Y%m%d')
        value: bool = is_expired(date_string)

        self.assertTrue(value)

    def test_is_expired_false(self) -> None:
        current_date: datetime = datetime.today()
        date_string: str = current_date.strftime('%Y%m%d')
        value: bool = is_expired(date_string)

        self.assertFalse(value)
