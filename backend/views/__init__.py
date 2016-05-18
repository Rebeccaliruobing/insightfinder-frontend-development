# -*- coding: utf-8 -*-
"""
    本模块包括URL路由定义及对应的视图。
"""


def init_app(app):

    from .main import MainView
    from .auth import AuthView
    main_view = MainView.as_view(b'main_view')
    auth_view = AuthView.as_view(b'auth_view')

    app.add_url_rule('/auth/', view_func=auth_view)
    app.add_url_rule('/auth/<string:action>', view_func=auth_view)

    app.add_url_rule('/', view_func=main_view)
    app.add_url_rule('/<path:path>', defaults={'action': 'all'}, view_func=main_view)
