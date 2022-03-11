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
from openwordle_server.test.context import OpenWordleApiTestCase, ApiResponse


class ShouldExpireApiTest(OpenWordleApiTestCase):
    def setUp(self) -> None:
        OpenWordleApiTestCase.setUpClass()

    def get(self, date_str: str) -> ApiResponse:
        request = self.api.get(
            f'/should_expire/{date_str}',
            follow_redirects=True
        )

        return ApiResponse(
            request.status_code, request.json.get('should_expire')
        )

    def test_is_expired_endpoint_true_past(self) -> None:
        current_date: datetime = datetime.today()
        current_date -= timedelta(days=1)
        date_string: str = current_date.strftime('%Y%m%d')
        result: ApiResponse = self.get(date_string)

        self.assertEqual(result.response_code, 200)
        self.assertTrue(result.response_txt)

    def test_is_expired_true_future(self) -> None:
        current_date: datetime = datetime.today()
        current_date += timedelta(days=1)
        date_string: str = current_date.strftime('%Y%m%d')
        result: ApiResponse = self.get(date_string)

        self.assertEqual(result.response_code, 200)
        self.assertTrue(result.response_txt)

    def test_is_expired_false(self) -> None:
        current_date: datetime = datetime.today()
        date_string: str = current_date.strftime('%Y%m%d')
        result: ApiResponse = self.get(date_string)

        self.assertEqual(result.response_code, 200)
        self.assertFalse(result.response_txt)
