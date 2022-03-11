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

from datetime import datetime

from openwordle_server.highlight import highlight_word
from openwordle_server.model import get_word_for_date, get_word_by_word


def get_status(given_word: str) -> str:
    correct_word: str = get_word_for_date()
    status: str = highlight_word(given_word, correct_word)

    return status


def is_expired(given_date: str) -> bool:
    current_date: datetime = datetime.today()
    date_string: str = current_date.strftime('%Y%m%d')

    return given_date != date_string


def is_word_valid(given_word: str) -> bool:
    is_valid: bool = get_word_by_word(given_word) is not None

    return is_valid
