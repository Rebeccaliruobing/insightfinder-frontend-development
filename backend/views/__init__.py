# -*- coding: utf-8 -*-
"""
    本模块包括URL路由定义及对应的视图。
"""
from flask import jsonify, request


def init_app(app):

    from .main import MainView
    main_view = MainView.as_view(b'main_view')

    app.add_url_rule('/', view_func=main_view)
    app.add_url_rule('/<path:path>', defaults={'action': 'all'}, view_func=main_view)

    @app.route("/upload", methods=['POST'])
    def upload():

        return jsonify({
            'success': True,
            'fileUrl': 'example.com/path'
        })
