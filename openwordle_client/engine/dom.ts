/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
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

export function isEndOfRow(i: number): boolean {
  return (i + 1) % GameOption.gameBoardRowLength === 0;
}

export function getModal(): Element {
  return document.querySelector('div.modal');
}

export function getGraph(): Element {
  return document.getElementById('graph');
}

export function getKeyboardElementForLetter(letter: string): Element {
  return document.getElementById(letter);
}

export function getActiveLetter(): Element {
  return document.querySelector('div.letter.active');
}

export function getGameBoard(): NodeListOf<Element> {
  return document.querySelectorAll('div.letter');
}

export function getGameBoardMount(): Element {
  return document.querySelector('div.gameboard');
}

export function getAlphaKeyboard(): NodeListOf<Element> {
  return document.querySelectorAll('button.letter');
}

export function getIndexOf(gameBoard: NodeListOf<Element>, activeLetter: Element): number {
  return Array.prototype.indexOf.call(gameBoard, activeLetter);
}

export function getCurrentBoardRow(): Element[] {
  const activeLetter: Element = getActiveLetter();
  const gameBoard: NodeListOf<Element> = getGameBoard();
  const i: number = getIndexOf(gameBoard, activeLetter);
  let j: number = 0;

  if (isEndOfRow(i)) {
    j = i - 4;
  }

  return Array.prototype.slice.call(gameBoard, j, (j + GameOption.gameBoardRowLength));
}

export function setNextLetterAsActive(goToNewRow: boolean) {
  const activeLetter: Element = getActiveLetter();
  const gameBoard: NodeListOf<Element> = getGameBoard();
  const i: number = getIndexOf(gameBoard, activeLetter);

  if (!isEndOfRow(i) || goToNewRow) {
    const newActiveLetter: Element = gameBoard[i + 1];

    activeLetter.classList.remove('active');
    newActiveLetter.classList.add('active');
  }
}

export function setPreviousLetterAsActive() {
  const activeLetter: Element = getActiveLetter();
  const gameBoard: NodeListOf<Element> = getGameBoard();
  const i: number = getIndexOf(gameBoard, activeLetter);

  if (isEndOfRow(i) && activeLetter.innerHTML !== '') {
    activeLetter.innerHTML = '';
  } else if (i !== 0 && !isEndOfRow(i - 1)) {
    const newActiveLetter: Element = gameBoard[i - 1];

    activeLetter.classList.remove('active');
    newActiveLetter.classList.add('active');
    newActiveLetter.innerHTML = '';
  }
}
