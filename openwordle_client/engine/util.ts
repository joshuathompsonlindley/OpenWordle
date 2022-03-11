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

export function getDateString(): string {
  const date = new Date();
  let dateString = date.toISOString().split('T')[0];

  dateString = dateString.replace('-', '');
  dateString = dateString.replace('-', '');

  return dateString;
}

export function isUndefined(type: any): boolean {
  return typeof type === 'undefined';
}

export function getGameWinRate(): number {
  return Math.round(((GameState.CurrentState.totalGames / GameState.CurrentState.totalWins) * 100));
}

export function translateCharToBlock(char: string): string {
  let block = '⬛';

  switch (char) {
    case '+':
      block = '🟩';
      break;
    case '-':
      block = '⬛';
      break;
    case '?':
      block = '🟨';
      break;
    default:
      break;
  }

  return block;
}

export function getGuessDistributionRate(i: number): number {
  // eslint-disable-next-line max-len
  return Math.round((GameState.CurrentState.guessDistribution[i] / GameState.CurrentState.totalWins) * 100);
}

export function sleep(time: number) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, time));
}
