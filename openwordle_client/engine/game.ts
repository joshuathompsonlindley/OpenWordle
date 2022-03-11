/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/*
   Copyright 2022 Overflow Digital

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import * as GameState from './state.js';
import * as GameUtil from './util.js';
import * as GameOption from './option.js';

export async function getCurrentStatus(): Promise<string> {
  const response = await fetch(`${GameOption.url}current_status/${GameState.CurrentState.currentWord}`);

  if (response.ok) {
    const data = await response.json();
    return data.current_status;
  }

  return 'null';
}

export async function isValidWord(): Promise<boolean> {
  const response = await fetch(`${GameOption.url}is_valid_word/${GameState.CurrentState.currentWord}`);

  if (response.ok) {
    const data = await response.json();
    return JSON.parse(data.is_valid_word);
  }

  return false;
}

export function didPlayerWin(): boolean {
  return GameState.CurrentState.guessingState[GameState.CurrentState.currentGuess] === '+++++';
}

export function getShareText(): string {
  const title: string = `${GameOption.gameTitle} ${GameUtil.getDateString()}`;
  let shareText: string = '';
  let row: number = 0;
  let letter: number = 0;

  shareText += `${title}\n\n`;
  shareText += `My current win rate is ${GameUtil.getGameWinRate()} %.\n\n`;

  for (row = 0; row < GameState.CurrentState.guessingState.length; row += 1) {
    for (letter = 0; letter < GameOption.gameBoardRowLength; letter += 1) {
      const state: string = GameState.CurrentState.guessingState[row][letter];

      if (state !== '0') {
        const block: string = GameUtil.translateCharToBlock(state);
        shareText += block;
      }
    }

    shareText += '\n';
  }

  return shareText;
}
