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
import itertools

from openwordle_server.test.context import OpenWordleApiTestCase, ApiResponse
from openwordle_server.config import Config


class CurrentStatusApiTest(OpenWordleApiTestCase):
    def setUp(self) -> None:
        OpenWordleApiTestCase.setUpClass()

        self.valid_responses: List[str] = list(
            map(''.join, itertools.product(
                '+?-', repeat=Config.GAMEBOARD_ROW_LENGTH))
        )

    def get(self, word: str) -> ApiResponse:

        if len(word) < Config.GAMEBOARD_ROW_LENGTH:
            word += ('a' * (Config.GAMEBOARD_ROW_LENGTH - len(word)))

        request = self.api.get(
            f'/current_status/{word}',
            follow_redirects=True
        )

        return ApiResponse(
            request.status_code, request.json.get('current_status')
        )

    def test_current_status_endpoint_1(self) -> None:
        result: ApiResponse = self.get('qwryu')

        self.assertEqual(result.response_code, 200)
        self.assertIn(result.response_txt, self.valid_responses)

    def test_current_status_endpoint_2(self) -> None:
        result: ApiResponse = self.get('tests')

        self.assertEqual(result.response_code, 200)
        self.assertIn(result.response_txt, self.valid_responses)

    def test_current_status_endpoint_3(self) -> None:
        result: ApiResponse = self.get('testa')

        self.assertEqual(result.response_code, 200)
        self.assertIn(result.response_txt, self.valid_responses)

    def test_current_status_endpoint_4(self) -> None:
        result: ApiResponse = self.get('tasts')

        self.assertEqual(result.response_code, 200)
        self.assertIn(result.response_txt, self.valid_responses)

    def test_current_status_endpoint_5(self) -> None:
        result: ApiResponse = self.get('stest')

        self.assertEqual(result.response_code, 200)
        self.assertIn(result.response_txt, self.valid_responses)

    def test_current_status_endpoint_6(self) -> None:
        result: ApiResponse = self.get('tasst')

        self.assertEqual(result.response_code, 200)
        self.assertIn(result.response_txt, self.valid_responses)

    def test_current_status_endpoint_7(self) -> None:
        result: ApiResponse = self.get('sests')

        self.assertEqual(result.response_code, 200)
        self.assertIn(result.response_txt, self.valid_responses)

    def test_current_status_endpoint_8(self) -> None:
        result: ApiResponse = self.get('sestt')

        self.assertEqual(result.response_code, 200)
        self.assertIn(result.response_txt, self.valid_responses)
