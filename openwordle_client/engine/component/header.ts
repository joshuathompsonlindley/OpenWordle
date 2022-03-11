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

const HeaderComponentStyle: string = `
<style>
header {
    -ms-flex-pack: justify;
    font-size: 1.5rem;
    height: 56px;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 25px;
}
</style>
`;

// eslint-disable-next-line func-names
const HeaderComponentHTML = (function () {
  return `
<header>
    <span>${GameOption.gameTitle}</span>
</header>
`;
}());

const HeaderComponent: string = HeaderComponentStyle + HeaderComponentHTML;

export default HeaderComponent;
