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

from flask import Flask
from werkzeug.middleware.proxy_fix import ProxyFix

from openwordle_server import database, talisman, limiter, cache
from openwordle_server.routes import controller
from openwordle_server.config import Config


def create_app(is_testing: bool = False) -> Flask:
    app = Flask(__name__, instance_relative_config=False)

    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1)  # type: ignore[assignment]

    app.config.from_object(Config)
    app.testing = is_testing
    app.register_blueprint(controller)

    with app.app_context():
        database.init_app(app)
        talisman.init_app(app)
        limiter.init_app(app)
        cache.init_app(app)

        talisman.content_security_policy = Config.CONTENT_SECURITY_POLICY

    return app
