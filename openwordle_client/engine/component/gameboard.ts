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

import * as GameOption from '../option.js';

const GameBoardComponentStyle: string = `
<style>
@-webkit-keyframes flip {
    50% {
        -webkit-transform: rotateX(-90deg);
        transform: rotateX(-90deg);
    }
}

@keyframes flip {
    50% {
        -webkit-transform: rotateX(-90deg);
        transform: rotateX(-90deg);
    }
}

@-webkit-keyframes blink {
    to {
        opacity: 0;
    }
}

@keyframes blink {
    to {
        opacity: 0;
    }
}

@-webkit-keyframes pop {
    50% {
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
}

@keyframes pop {
    50% {
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
    }
}

@keyframes shake {
    10%,
    90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
        transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
        transform: translate3d(4px, 0, 0);
    }
}

@-webkit-keyframes shake {
    10%,
    90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
        transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
        transform: translate3d(4px, 0, 0);
    }
}

.gameboard {
    grid-gap: 0.5rem;
    aspect-ratio: ${GameOption.gameBoardRowLength}/${GameOption.gameBoardLength};
    display: grid;
    grid-template: repeat(${GameOption.gameBoardLength}, 1fr) / repeat(${GameOption.gameBoardRowLength}, 1fr);
    height: 100%;
    justify-self: center;
    max-width: 100%;
    min-height: 0;
    min-width: 0;
    margin-bottom: 50px;
}

.letter {
    -ms-flex-align: center;
    -ms-flex-pack: center;
    align-items: center;
    border-radius: 2px;
    background: #616161;
    display: -ms-flexbox;
    display: flex;
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    justify-content: center;
    position: relative;
    text-transform: uppercase;
}

.letter.submitted.one {
    -webkit-animation-delay: 0s !important;
    animation-delay: 0s !important;
    transition-delay: 0.1s !important;
    transition: ease-in;
    transition-duration: 0.1s;
}

.letter.submitted.two {
    -webkit-animation-delay: 0.1s !important;
    animation-delay: 0.1s !important;
    transition: ease-in;
    transition-duration: 0.1s;
    transition-delay: 0.2s !important;
}

.letter.submitted.three {
    -webkit-animation-delay: 0.2s !important;
    animation-delay: 0.2s !important;
    transition: ease-in;
    transition-duration: 0.1s;
    transition-delay: 0.3s !important;
}

.letter.submitted.four {
    -webkit-animation-delay: 0.3s !important;
    animation-delay: 0.3s !important;
    transition: ease-in;
    transition-duration: 0.1s;
    transition-delay: 0.4s !important;
}

.letter.submitted.five {
    -webkit-animation-delay: 0.4s !important;
    animation-delay: 0.4s !important;
    transition: ease-in;
    transition-duration: 0.1s;
    transition-delay: 0.5s !important;
}

.letter:not(.submitted):not(:empty) {
    -webkit-animation: pop 0.2s ease-out;
    animation: pop 0.2s ease-out;
}

.letter.active:after {
    -webkit-animation: blink 0.6s ease-in-out infinite alternate;
    animation: blink 0.6s ease-in-out infinite alternate;
    background: #ffffff;
    bottom: calc(50% - 0.8rem);
    content: "";
    display: block;
    height: 2px;
    position: absolute;
    width: 30%;
}

.letter.submitted {
    -webkit-animation: flip 0.5s ease-in-out forwards;
    animation: flip 0.5s ease-in-out forwards;
}

.gameboard.shake {
    -webkit-animation: shake 0.5s ease-in-out forwards;
    animation: shake 0.5s ease-in-out forwards;
}
</style>
`;

// eslint-disable-next-line func-names
const GameBoardComponentHTML = (function () {
  let row: number = 0;
  let cell: number = 0;
  let html: string = '<div class="gameboard">';

  for (row; row < GameOption.gameBoardLength; row += 1) {
    for (cell; cell < GameOption.gameBoardRowLength; cell += 1) {
      const modifier: string = cell === 0 && row === 0 ? 'active' : '';
      const identifierLookup: object = {
        1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
      };
      const identifer = identifierLookup[cell + 1];

      html += `<div class="letter ${identifer} ${modifier}"></div>`;
    }

    cell = 0;
  }

  html += '</div>';

  return html;
}());

const GameBoardComponent: string = GameBoardComponentStyle + GameBoardComponentHTML;

export default GameBoardComponent;
