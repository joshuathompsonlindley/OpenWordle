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

import * as GameRenderer from './renderer.js';
import * as GameEventManager from './event.js';
import * as GameDOM from './dom.js';
import * as StorageManager from './storage.js';

export function registerEvents() {
  const keyboard: NodeListOf<Element> = GameDOM.getAlphaKeyboard();
  const backspace: Element = document.querySelector('button.backspace');
  const enter: Element = document.querySelector('button.enter');
  const share: Element = document.querySelector('button.share');

  share.addEventListener('click', (event) => {
    GameEventManager.shareButtonEvent();
    if (event.target instanceof Element) {
      (event.target as HTMLElement).blur();
    }
  }, false);

  backspace.addEventListener('click', (event) => {
    GameEventManager.keyboardBackspaceInputEvent();
    if (event.target instanceof Element) {
      (event.target as HTMLElement).blur();
    }
  }, false);

  enter.addEventListener('click', (event) => {
    GameEventManager.keyboardEnterInputEvent();
    if (event.target instanceof Element) {
      (event.target as HTMLElement).blur();
    }
  }, false);

  keyboard.forEach((key) => key.addEventListener('click', (event) => {
    GameEventManager.keyboardAlphaInputEvent(key);
    if (event.target instanceof Element) {
      (event.target as HTMLElement).blur();
    }
  }), false);
}

export function main() {
  GameRenderer.renderPage();
  StorageManager.pushStateToGame();
  registerEvents();
}

main();
