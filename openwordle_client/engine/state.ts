/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-spread */
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

import * as GameOption from './option.js';

export const CurrentState = {
  currentWord: '',
  currentGuess: 0,
  isLoopActive: true,
  totalGames: 0,
  totalWins: 0,
  guessingState: Array.apply(null, Array(GameOption.gameBoardLength)).map(() => '0'.repeat(GameOption.gameBoardRowLength)),
  wordState: Array.apply(null, Array(GameOption.gameBoardLength)).map(() => '0'.repeat(GameOption.gameBoardRowLength)),
  guessDistribution: Array.apply(null, Array(GameOption.gameBoardLength)).map(() => 0),
};

export function setDefaults(resetStats: boolean) {
  CurrentState.currentWord = '';
  CurrentState.currentGuess = 0;
  CurrentState.isLoopActive = true;
  CurrentState.guessingState = Array.apply(null, Array(GameOption.gameBoardLength)).map(() => '0'.repeat(GameOption.gameBoardRowLength));
  CurrentState.wordState = Array.apply(null, Array(GameOption.gameBoardLength)).map(() => '0'.repeat(GameOption.gameBoardRowLength));

  if (resetStats) {
    CurrentState.totalWins = 0;
    CurrentState.totalGames = 0;
    // eslint-disable-next-line max-len
    CurrentState.guessDistribution = Array.apply(null, Array(GameOption.gameBoardLength)).map(() => 0);
  }
}
