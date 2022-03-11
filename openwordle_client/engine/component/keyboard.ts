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

const KeyboardComponentStyle: string = `
<style>
.keyboard {
    margin-bottom: 15px;
    grid-gap: 0.4rem;
    display: grid;
    grid-template-rows: 3, 1fr;
}

.keyboard.long {
    grid-template-columns: repeat(10, minmax(0, 1fr)) !important;
}

.keyboard.short {
    grid-template-columns: repeat(9, minmax(0, 1fr)) !important;
}

.key,
.keyboard {
    -ms-flex-pack: center;
    justify-content: center;
}

.key {
    -ms-flex-align: center;
    align-items: center;
    border: none;
    border-radius: 2px;
    background: #616161;
    color: white;
    display: -ms-flexbox;
    display: flex;
    font-weight: bold;
    font-size: 1rem;
    height: 40px;
    text-transform: uppercase;
    transition: all 0.15s ease-in-out;
    will-change: transform;
}

.key.backspace {
    background-color: #ee2b2b;
}

.key.enter {
    background-color: #239a29;
}

.key:active {
    -webkit-transform: scale(0.95) translateY(2px);
    -ms-transform: scale(0.95) translateY(2px);
    transform: scale(0.95) translateY(2px);
}
</style>
`;

// eslint-disable-next-line func-names
const KeyboardComponentHTML = (function () {
  const keyboard: string[][] = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], ['⏎', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫']];
  let html: string = '';

  keyboard.forEach((keyboardRow) => {
    const isLong: string = keyboardRow.length === 10 ? 'long' : 'short';
    html += `<div class="keyboard ${isLong}">`;

    keyboardRow.forEach((key) => {
      const modifierLookup: object = {
        '⌫': 'backspace', '⏎': 'enter',
      };
      const modifier: string = key in modifierLookup ? modifierLookup[key] : 'letter';

      html += `<button class="key ${modifier}" id="${key}">${key}</button>`;
    });

    html += '</div>';
  });

  return html;
}());

const KeyboardComponent: string = KeyboardComponentStyle + KeyboardComponentHTML;

export default KeyboardComponent;
