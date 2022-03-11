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

import * as GameDOM from './dom.js';
import * as GameManager from './game.js';
import * as GameUtil from './util.js';
import * as GameOption from './option.js';
import * as GameState from './state.js';

import GameBoardComponent from './component/gameboard.js';
import HeaderComponent from './component/header.js';
import KeyboardComponent from './component/keyboard.js';
import StatsModalComponent from './component/stats.js';

export async function renderCurrentBoardRow() {
  const currentBoardRow: Element[] = GameDOM.getCurrentBoardRow();

  currentBoardRow.forEach(async (element) => {
    const i: number = currentBoardRow.indexOf(element);
    // eslint-disable-next-line max-len
    const state: string = GameState.CurrentState.guessingState[GameState.CurrentState.currentGuess][i];
    const block: string = GameUtil.translateCharToBlock(state);

    element.classList.add('submitted');
    element.classList.add(block);
  });
}

export async function renderFullBoardAndKeyboard() {
  const gameBoard: NodeListOf<Element> = GameDOM.getGameBoard();
  // eslint-disable-next-line no-underscore-dangle
  const _break = [];

  try {
    let row: number = 0;
    let letter: number = 0;

    gameBoard.forEach((element) => {
      const character: string = GameState.CurrentState.wordState[row][letter];
      const key: Element = GameDOM.getKeyboardElementForLetter(character);

      if (element.classList.contains('active')) {
        element.classList.remove('active');
      }

      if (character !== '0' && !GameUtil.isUndefined(character) && character && character !== undefined) {
        const state: string = GameState.CurrentState.guessingState[row][letter];
        const block: string = GameUtil.translateCharToBlock(state);
        // eslint-disable-next-line no-param-reassign
        element.innerHTML = character;

        if (block !== '') {
          element.classList.add(block);
          key.classList.add(block);

          if (block === '🟩') {
            key.classList.remove('🟨', '⬛');
          } else if (block === '⬛') {
            key.classList.remove('🟩', '🟨');
          } else if (block === '🟨') {
            key.classList.remove('🟩', '⬛');
          }
        }
      } else if (character === '0' && !GameUtil.isUndefined(character)) {
        element.classList.add('active');
        throw _break;
      }

      if (letter !== 0 && GameDOM.isEndOfRow(letter)) {
        row += 1;
        letter = 0;
      } else {
        letter += 1;
      }
    });
    // eslint-disable-next-line no-empty
  } catch (e) { }
}

export async function renderKeyboard() {
  const guessingState = GameState.CurrentState.guessingState[GameState.CurrentState.currentGuess];
  let i: number = 0;

  for (i; i < guessingState.length; i += 1) {
    const character: string = guessingState[i];
    const letter: string = GameState.CurrentState.currentWord[i];
    const key: Element = GameDOM.getKeyboardElementForLetter(letter);
    const block: string = GameUtil.translateCharToBlock(character);

    if (block === '⬛' && !key.classList.contains('🟩') && !key.classList.contains('🟨')) {
      key.classList.add(block);
      key.classList.remove('🟩', '🟨');
    } else if (block === '🟨' && !key.classList.contains('🟩')) {
      key.classList.add(block);
      key.classList.remove('🟩', '⬛');
    } else if (block === '🟩') {
      key.classList.add(block);
      key.classList.remove('🟨', '⬛');
    }
  }
}

export async function renderModal() {
  const modal: Element = GameDOM.getModal();
  const graph: Element = GameDOM.getGraph();
  const activeLetter: Element = GameDOM.getActiveLetter();
  const totalWinsStat: Element = document.querySelector('div.total');
  const totalGamesStat: Element = document.querySelector('div.games');
  const winPercentageStat: Element = document.querySelector('div.percentage');
  const winMessage: Element = document.querySelector('div.win');
  // eslint-disable-next-line max-len
  const message: string = GameManager.didPlayerWin() ? GameOption.winMessage : GameOption.lostMessage;
  const graphLabels: string[] = ['1st', '2nd', '3rd', '4th', '5th', '6th'];
  let i: number = 0;

  winMessage.innerHTML = message;
  totalGamesStat.innerHTML = GameState.CurrentState.totalGames.toString();
  totalWinsStat.innerHTML = GameState.CurrentState.totalWins.toString();
  winPercentageStat.innerHTML = `${GameUtil.getGameWinRate().toString()}%`;

  for (i = 0; i < GameState.CurrentState.guessDistribution.length; i += 1) {
    const graphRow: HTMLDivElement = document.createElement('div');
    const graphBar: HTMLDivElement = document.createElement('div');
    const percentage: number = GameUtil.getGuessDistributionRate(i);

    graphRow.classList.add('graph-row');
    graphRow.innerHTML = `<div class="txt">At ${graphLabels[i]} guess: <b>${percentage}%</b></div>`;
    graphBar.classList.add('graph-bar');
    graphBar.style.minWidth = `${percentage}%`;

    if (GameState.CurrentState.guessDistribution[i] !== 0) {
      graphRow.appendChild(graphBar);
    }

    graph.append(graphRow);
  }

  modal.classList.add('modal--visible');
  activeLetter.classList.remove('active');
}

export function renderGameBoardWrongAnimation() {
  const gameBoard: Element = GameDOM.getGameBoardMount();

  gameBoard.classList.add('shake');
  GameUtil.sleep(250).then(() => gameBoard.classList.remove('shake'));
}

export function renderPage() {
  const app: Element = document.getElementById('app');

  document.title = GameOption.gameTitle;
  document.querySelector('meta[name="description"]').setAttribute('content', GameOption.gameDescription);
  document.querySelector('meta[name="application-name"]').setAttribute('content', GameOption.gameTitle);

  app.innerHTML += HeaderComponent;
  app.innerHTML += StatsModalComponent;
  app.innerHTML += GameBoardComponent;
  app.innerHTML += KeyboardComponent;
}
