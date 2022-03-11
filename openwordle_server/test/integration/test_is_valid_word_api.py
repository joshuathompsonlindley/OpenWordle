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

from typing import List

from openwordle_server.config import Config
from openwordle_server.test.context import OpenWordleApiTestCase, ApiResponse


class IsValidWordApiTest(OpenWordleApiTestCase):
    def setUp(self) -> None:
        OpenWordleApiTestCase.setUpClass()

        self.correct_words: List[str] = []
        self.wrong_words: List[str] = [
            ('a' * Config.GAMEBOARD_ROW_LENGTH),
            ('b' * Config.GAMEBOARD_ROW_LENGTH),
            ('c' * Config.GAMEBOARD_ROW_LENGTH),
            ('d' * Config.GAMEBOARD_ROW_LENGTH),
            ('e' * Config.GAMEBOARD_ROW_LENGTH)
        ]

        with open(Config.TXT_FILE, 'r', encoding='UTF-8') as file:
            for _ in range(5):
                line: str = file.readline().lower().replace('\n', '')
                self.correct_words.append(line)

    def get(self, word: str) -> ApiResponse:
        request = self.api.get(
            f'/is_valid_word/{word}',
            follow_redirects=True
        )

        return ApiResponse(
            request.status_code, request.json.get('is_valid_word')
        )

    def test_is_valid_word_correct_1(self):
        result: ApiResponse = self.get(self.correct_words[0])

        self.assertEqual(result.response_code, 200)
        self.assertTrue(result.response_txt)

    def test_is_valid_word_correct_2(self):
        result: ApiResponse = self.get(self.correct_words[1])

        self.assertEqual(result.response_code, 200)
        self.assertTrue(result.response_txt)

    def test_is_valid_word_correct_3(self):
        result: ApiResponse = self.get(self.correct_words[2])

        self.assertEqual(result.response_code, 200)
        self.assertTrue(result.response_txt)

    def test_is_valid_word_correct_4(self):
        result: ApiResponse = self.get(self.correct_words[3])

        self.assertEqual(result.response_code, 200)
        self.assertTrue(result.response_txt)

    def test_is_valid_word_correct_5(self):
        result: ApiResponse = self.get(self.correct_words[4])

        self.assertEqual(result.response_code, 200)
        self.assertTrue(result.response_txt)

    def test_is_valid_word_wrong_1(self):
        result: ApiResponse = self.get(self.wrong_words[0])

        self.assertEqual(result.response_code, 200)
        self.assertFalse(result.response_txt)

    def test_is_valid_word_wrong_2(self):
        result: ApiResponse = self.get(self.wrong_words[1])

        self.assertEqual(result.response_code, 200)
        self.assertFalse(result.response_txt)

    def test_is_valid_word_wrong_3(self):
        result: ApiResponse = self.get(self.wrong_words[2])

        self.assertEqual(result.response_code, 200)
        self.assertFalse(result.response_txt)

    def test_is_valid_word_wrong_4(self):
        result: ApiResponse = self.get(self.wrong_words[3])

        self.assertEqual(result.response_code, 200)
        self.assertFalse(result.response_txt)

    def test_is_valid_word_wrong_5(self):
        result: ApiResponse = self.get(self.wrong_words[4])

        self.assertEqual(result.response_code, 200)
        self.assertFalse(result.response_txt)
