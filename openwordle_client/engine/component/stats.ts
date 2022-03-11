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

const StatsModalComponentStyle: string = `
<style>
#graph {
    margin-top: 10px;
    font-size: 14px;
}

.graph-bar {
    background-color: #35a73e;
    display: inline-block;
    height: 14px;
    margin-top: 3px;
}

.graph-row {
    padding: 5px;
}

.modal {
    -ms-flex-pack: center;
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
    background: rgba(0, 0, 0, 0.4);
    bottom: 0;
    justify-content: center;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.2s ease-in-out;
    -ms-flex-align: center;
    align-items: center;
    display: -ms-flexbox;
    display: flex;
}

.stats {
    display: grid;
    grid-template-columns: 33.3% 33.3% 33.3%;
}

.modal div.content {
    background: #ffffff;
    border-radius: 2px;
    padding: 1rem;
    margin: 1rem;
    width: 300px;
}

@media (prefers-color-scheme: dark) {
    .modal div.content {
        background: #000000;
        color: #ffffff;
    }
}

.modal .title {
    font-weight: bold;
    font-size: 18px;
}

.modal .win, .modal .stats, .modal #graph {
    margin-bottom: 20px;
}

.modal .total, .modal .games, .modal .percentage {
    font-weight: light;
    font-size: 24px;
}

.modal--visible {
    opacity: 1;
    pointer-events: auto;
    z-index: 1;
}

.share {
    padding: 7px 14px;
    color: white;
    background-color: #35a73e;
    border-radius: 2px;
    font-size: 16px;
    width: 100%;
    border: none;
    box-shadow: none;
}
</style>
`;

// eslint-disable-next-line func-names
const StatsModalComponentHTML = (function () {
  return `
<div class="modal">
    <div class="content">
        <div class="title">Game Over!</div>
        <div class="win"></div>
        <div class="stats">
            <div>
                <div class="title">Games:</div>
                <div class="games"></div>
            </div>
            <div>
                <div class="title">Wins:</div>
                <div class="total"></div>
            </div>
            <div>
                <div class="title">Win Rate:</div>
                <div class="percentage"></div>
            </div>
        </div>
        <div class="title">Guess Distribution:</div>
        <div id="graph" class="distribution"></div>
        <button class="share">
            Share your progress
        </button>
    </div>
</div>
`;
}());

const StatsModalComponent: string = StatsModalComponentStyle + StatsModalComponentHTML;

export default StatsModalComponent;
