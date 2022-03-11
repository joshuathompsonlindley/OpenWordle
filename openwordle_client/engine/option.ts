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

export const url: string = 'https://{env: URL}/';
export const gameBoardRowLength: number = parseInt('{env: GAMEBOARD_ROW_LENGTH}', 10);
export const gameBoardLength: number = parseInt('{env: GAMEBOARD_LENGTH}', 10);
export const gameTitle: string = '{env: GAME_TITLE}';
export const gameDescription: string = '{env: GAME_DESCRIPTION}';
export const winMessage: string = '{env: WIN_MESSAGE}';
export const lostMessage: string = '{env: LOSE_MESSAGE}';
