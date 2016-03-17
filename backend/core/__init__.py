# -*- coding: utf-8 -*-

from flask import Blueprint
from flask.ext.restful import Api
from .views import ActionView
from .apis import ActionApi
from .assets import Assets

__all__ = ['init_app']

# bp = Blueprint('api', __name__, url_prefix='/api')
# api = Api(bp)


def init_app(app):
    # app.register_blueprint(bp)

    assets = Assets()
    assets.init_app(app)

    if app.config.get('CORE_PROTOTYPE', False):
        from .prototype import clorem, image_placeholder
        app.add_url_rule("/prototype/images", view_func=image_placeholder)
        app.add_template_global(clorem)
