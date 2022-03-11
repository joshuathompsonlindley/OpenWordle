/* eslint-disable no-unused-vars */
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
import * as GameRenderer from './renderer.js';
import * as GameUtil from './util.js';
import * as GameOption from './option.js';

export async function shouldInvalidate(expiry: string): Promise<boolean> {
  const response = await fetch(`${GameOption.url}should_expire/${expiry}`);

  if (response.ok) {
    const data = await response.json();
    return data.should_expire;
  }
  return true;
}

export function saveStateFromMemory() {
  const { localStorage } = window;
  const dateString: string = GameUtil.getDateString();

  localStorage.setItem('expire', dateString);

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(GameState.CurrentState)) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export async function loadStateIntoMemory(): Promise<boolean> {
  const { localStorage } = window;
  const expire: string = localStorage.getItem('expire');

  if (!GameUtil.isUndefined(expire)) {
    const shouldInvalidateCookie = await shouldInvalidate(expire);

    if (!shouldInvalidateCookie) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, _] of Object.entries(GameState.CurrentState)) {
        GameState.CurrentState[key] = JSON.parse(localStorage.getItem(key.toString()));
      }
    } else {
      const totalWins: number = JSON.parse(localStorage.getItem('totalWins'));
      const guessDistribution: number[] = JSON.parse(localStorage.getItem('guessDistribution'));
      const totalGames: number = JSON.parse(localStorage.getItem('totalGames'));

      if (totalGames && totalWins && guessDistribution) {
        GameState.setDefaults(false);

        GameState.CurrentState.totalGames = totalGames;
        GameState.CurrentState.totalWins = totalWins;
        GameState.CurrentState.guessDistribution = guessDistribution;
      } else {
        GameState.setDefaults(true);
      }
    }
  } else {
    GameState.setDefaults(true);
  }

  return true;
}

export async function pushStateToGame() {
  loadStateIntoMemory().then(async () => {
    await GameRenderer.renderFullBoardAndKeyboard();

    if (!GameState.CurrentState.isLoopActive) {
      GameRenderer.renderModal();
    }
  });
}
