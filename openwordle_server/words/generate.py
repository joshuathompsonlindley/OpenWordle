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

import os
import random
import sqlite3
from datetime import datetime, timedelta
from typing import List

date: datetime = datetime.today()
word_list: List[str] = []
directory: str = os.path.dirname(os.path.realpath(__file__))
database = sqlite3.connect(os.path.join(directory, 'words.db'))
cursor = database.cursor()
inserted: int = 0

with open(os.path.join(directory, 'words.txt'), 'r', encoding='UTF-8') as file:
    word_list.extend(file.readlines())

cursor.execute('DROP TABLE IF EXISTS words')
cursor.execute(
    'CREATE TABLE words (date TEXT NOT NULL UNIQUE,' +
    'word TEXT NOT NULL UNIQUE, PRIMARY KEY(date));')

word_list = list(dict.fromkeys(word_list))
random.shuffle(word_list)

for word in word_list:
    date_string: str = date.strftime('%Y%m%d')
    word = word.lower()
    word = word.replace('\n', '')

    if word != '':
        cursor.execute("INSERT INTO words VALUES (?, ?)", (date_string, word))
        print(f'+ INSERT INTO words VALUES ({date_string}, {word})')
        inserted += 1
        date += timedelta(days=1)

database.commit()

print(f'There are {inserted} words in the list')
print('Saved to words.db')
