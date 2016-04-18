# -*- coding: utf-8 -*-
"""
    本模块包括URL路由定义及对应的视图。
"""

from __future__ import absolute_import


def init_app(app):
    from .main import MainView
    main_view = MainView.as_view(b'main_view')

    app.add_url_rule("/", defaults={'path': None}, view_func=main_view)
    app.add_url_rule("/<path:path>", view_func=main_view)
