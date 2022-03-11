#!/usr/bin/python3
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

import argparse
import os
import re
import subprocess
from typing import Dict, List

CAPTURE = re.compile(r'{env: (.*?)}')

parser = argparse.ArgumentParser(
    description='Transforms environment variables to their values in code.')
parser.add_argument('-f', '--files', nargs='+',
                    help='List of files to process. (Required)', required=True)


def get_sed_commands(path: str) -> List[List[str]]:
    commitable_changes: List[List[str]] = []
    file: str = ''

    with open(path, 'r', encoding="UTF-8") as opened:
        file = ''.join(opened.readlines())

    matches = re.findall(CAPTURE, file)

    for match in matches:
        commitable_changes.append([
            'sed', '-i', '-e',
            's/{env: ' + match + '}/' + os.environ[match] + '/g',
            path
        ])

    return commitable_changes


def processor(file_list: List[str]) -> Dict[str, List[List[str]]]:
    change_list: Dict[str, List[List[str]]] = {}

    for file in file_list:
        commands = get_sed_commands(file)

        if commands:
            change_list[file] = commands

    return change_list


def commit_changes(change_list: Dict[str, List[List[str]]]) -> None:
    for file, commands in change_list.items():
        print(f'+ Transforming environment variables for file {file}')

        for command in commands:
            try:
                subprocess.run(command, check=True)
            except subprocess.CalledProcessError:
                print('+ Error running that command.')


if __name__ == '__main__':
    args = parser.parse_args()
    files: List[str] = parser.parse_args()._get_kwargs()[0][1]
    changes: Dict[str, List[List[str]]] = processor(files)

    commit_changes(changes)
