#    Copyright 2022 Overflow Digital
#
#    Licensed under the Apache License, Version 2.0 (the "License");
#    you may not use this file except in compliance with the License.
#    You may obtain a copy of the License at
#
#        http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS,
#    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#    See the License for the specific language governing permissions and
#    limitations under the License.

from typing import Tuple

from flask import Blueprint, Response, jsonify, render_template

from openwordle_server import limiter, cache
from openwordle_server.util import get_status, is_expired, is_word_valid

controller: Blueprint = Blueprint('controller', __name__)


@controller.route('/current_status/<string:word>', methods=['GET'])
@limiter.limit('1/2 seconds')
@cache.cached(timeout=2)
def current_status(word: str) -> Tuple[Response, int]:
    value: str = get_status(word)
    return jsonify(current_status=value), 200


@controller.route('/is_valid_word/<string:word>', methods=['GET'])
@limiter.limit('1/2 seconds')
@cache.cached(timeout=300)
def is_valid_word(word: str) -> Tuple[Response, int]:
    value: bool = is_word_valid(word)
    return jsonify(is_valid_word=value), 200


@limiter.limit('1/second')
@controller.route('/should_expire/<string:date>', methods=['GET'])
@cache.cached(timeout=1)
def should_expire(date: str) -> Tuple[Response, int]:
    value: bool = is_expired(date)
    return jsonify(should_expire=value), 200


@controller.route('/', methods=['GET'])
def index() -> str:
    return render_template('index.html')
