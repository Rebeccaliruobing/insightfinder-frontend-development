# -*- coding: utf-8 -*-
"""
    本模块包括：页面视图相关的全局错误处理、页面视图及对应的URL路由定义。
"""

from __future__ import absolute_import, unicode_literals

from flask import Blueprint, render_template, request
from flask.json import jsonify

bp = Blueprint('views', __name__)


@bp.app_errorhandler(404)
def page_not_found(e):
    if request.accept_mimetypes.accept_json and \
            not request.accept_mimetypes.accept_html:
        response = jsonify({
            'error': 'not found',
        })
        response.status_code = 404
        return response
    return render_template('404.html'), 404


# TODO: [FIX] Add back 500 when logging is ready
# @bp.app_errorhandler(500)
# def server_error(e):
#     if request.accept_mimetypes.accept_json and \
#             not request.accept_mimetypes.accept_html:
#         response = jsonify({
#             'error': 'internal server error',
#         })
#         response.status_code = 500
#         return response
#     return render_template('500.html', error=e), 500


def init_app(app):

    from .main import MainView
    main_view = MainView.as_view(b'main_view')
    bp.add_url_rule("/", view_func=main_view)
    bp.add_url_rule("/<string:action>", view_func=main_view)
    bp.add_url_rule("/monitoring/<string:action>", view_func=main_view)

    app.register_blueprint(bp)
