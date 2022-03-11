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
from typing import Optional

from openwordle_server import database


class Words(database.Model):
    __tablename__ = 'words'

    date = database.Column(database.Text, primary_key=True,
                           nullable=False, unique=True)
    word = database.Column(database.Text, nullable=False, unique=True)


def get_word_for_date() -> str:
    date: datetime = datetime.today()
    date_string: str = date.strftime('%Y%m%d')
    result: Words = Words.query.filter(Words.date == date_string).first()
    word: str = result.word

    return word


def get_word_by_word(word: str) -> Optional[Words]:
    return Words.query.filter(Words.word == word).first()
