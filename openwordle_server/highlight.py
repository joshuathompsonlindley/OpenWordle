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

from typing import Dict, List

from openwordle_server.config import Config


def get_highlight_table(given_word: str, correct_word: str) -> List[int]:
    given_map: List[int] = [*map(ord, given_word)]
    correct_map: List[int] = [*map(ord, correct_word)]
    zipped: List[int] = [
        given_char - correct_char
        or correct_char
        for given_char, correct_char
        in zip(given_map, correct_map)
    ]
    highlight_table: List[int] = [
        given_map[i] - correct_map[i]
        and ~((given_map[:i] + zipped[i:]).count(given_map[i])
              < correct_map.count(given_map[i]))
        for i in range(Config.GAMEBOARD_ROW_LENGTH)
    ]

    return highlight_table


def highlight_word(given_word: str, correct_word: str) -> str:
    current_status: str = '-' * Config.GAMEBOARD_ROW_LENGTH
    lookup_table: Dict[int, str] = {-1: '-', -2: '?', 0: '+'}
    highlight_table: List[int] = get_highlight_table(given_word, correct_word)

    for index, highlight in enumerate(highlight_table):
        character: str = lookup_table.get(highlight, '')
        current_status = current_status[:index] + \
            character + current_status[index + 1:]

    return current_status
