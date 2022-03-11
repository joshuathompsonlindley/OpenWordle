/* eslint-disable camelcase */
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

import * as GameManager from './game.js';
import * as GameDOM from './dom.js';
import * as GameState from './state.js';
import * as StorageManager from './storage.js';
import * as GameRenderer from './renderer.js';
import * as GameUtil from './util.js';
import * as GameOption from './option.js';

export async function gameOverEvent() {
  const activeLetter: Element = GameDOM.getActiveLetter();

  GameState.CurrentState.totalGames += 1;

  if (GameManager.didPlayerWin()) {
    GameState.CurrentState.totalWins += 1;
    GameState.CurrentState.guessDistribution[GameState.CurrentState.currentGuess] += 1;
  }

  GameState.CurrentState.isLoopActive = false;

  StorageManager.saveStateFromMemory();

  await GameUtil.sleep(700).then(() => {
    GameRenderer.renderModal();
  });

  activeLetter.classList.remove('active');
}

export function keyboardAlphaInputEvent(element: Element) {
  if (GameState.CurrentState.isLoopActive) {
    const activeLetter: Element = GameDOM.getActiveLetter();
    const gameBoard: NodeListOf<Element> = GameDOM.getGameBoard();
    const letter: string = element.id;
    const i: number = GameDOM.getIndexOf(gameBoard, activeLetter);

    if (i !== gameBoard.length && activeLetter.innerHTML === '') {
      if (GameState.CurrentState.currentWord.length < GameOption.gameBoardRowLength) {
        GameState.CurrentState.currentWord += letter;
        StorageManager.saveStateFromMemory();
      } else if (GameState.CurrentState.currentWord.length === GameOption.gameBoardRowLength) {
        // eslint-disable-next-line max-len
        GameState.CurrentState.currentWord = GameState.CurrentState.currentWord.slice(0, 4) + letter;
        StorageManager.saveStateFromMemory();
      }

      activeLetter.innerHTML = letter;
      GameDOM.setNextLetterAsActive(false);
    }

    StorageManager.saveStateFromMemory();
  }
}

export function keyboardBackspaceInputEvent() {
  if (GameState.CurrentState.isLoopActive) {
    if (GameState.CurrentState.currentWord.length <= GameOption.gameBoardRowLength) {
      // eslint-disable-next-line max-len
      GameState.CurrentState.currentWord = GameState.CurrentState.currentWord.slice(0, (GameState.CurrentState.currentWord.length - 1));
      StorageManager.saveStateFromMemory();
    }

    GameDOM.setPreviousLetterAsActive();
    StorageManager.saveStateFromMemory();
  }
}

export async function keyboardEnterInputEvent() {
  if (GameState.CurrentState.isLoopActive) {
    if (GameState.CurrentState.currentWord.length === GameOption.gameBoardRowLength) {
      GameManager.isValidWord().then(async (is_valid_word) => {
        if (!is_valid_word) {
          GameRenderer.renderGameBoardWrongAnimation();
          // eslint-disable-next-line max-len
        } else {
          GameManager.getCurrentStatus().then(async (current_status) => {
            // eslint-disable-next-line max-len
            GameState.CurrentState.guessingState[GameState.CurrentState.currentGuess] = current_status;

            if (GameState.CurrentState.currentGuess === GameOption.gameBoardLength) {
              StorageManager.saveStateFromMemory();
              await GameRenderer.renderCurrentBoardRow();

              GameRenderer.renderKeyboard().then(() => {
                gameOverEvent();
              });
            } else {
              // eslint-disable-next-line max-len
              GameState.CurrentState.wordState[GameState.CurrentState.currentGuess] = GameState.CurrentState.currentWord;
              StorageManager.saveStateFromMemory();
              await GameRenderer.renderCurrentBoardRow();

              GameRenderer.renderKeyboard().then(() => {
                if (GameManager.didPlayerWin()) {
                  gameOverEvent();
                } else {
                  GameState.CurrentState.currentWord = '';
                  GameState.CurrentState.currentGuess += 1;

                  StorageManager.saveStateFromMemory();
                  GameDOM.setNextLetterAsActive(true);
                }
              });
            }
          });
        }
      });
    }
    StorageManager.saveStateFromMemory();
  }
}

export function shareButtonEvent() {
  const shareText = GameManager.getShareText();

  if (shareText !== '') {
    if (navigator.share) {
      navigator.share({ text: shareText }).catch(() => { });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
    }
  }
}
