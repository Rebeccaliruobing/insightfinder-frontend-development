# -*- coding: utf-8 -*-
""" 常用http的全局错误处理函数及异常类的定义
"""
from __future__ import absolute_import

from flask import Blueprint, request, jsonify, render_template


# TODO: [REV] need to handle 403 forbidden?
# TODO: [REV] need to debug errors for json response.

# 注册全局http错误处理函数
errors_bp = Blueprint('views', __name__ + 'views')


@errors_bp.app_errorhandler(400)
def page_bad_request(e):
    if request.accept_mimetypes.accept_json and \
            not request.accept_mimetypes.accept_html:
        resp = jsonify({'error': 'bad request'})
        resp.status_code = 400
        return resp
    return render_template('400.html', error=e), 404


@errors_bp.app_errorhandler(404)
def page_not_found(e):
    if request.accept_mimetypes.accept_json and \
            not request.accept_mimetypes.accept_html:
        resp = jsonify({'error': 'not found'})
        resp.status_code = 404
        return resp
    return render_template('404.html', error=e), 404


@errors_bp.app_errorhandler(500)
def server_error(e):
    if request.accept_mimetypes.accept_json and \
            not request.accept_mimetypes.accept_html:
        resp = jsonify({'error': 'server error'})
        resp.status_code = 500
        return resp
    return render_template('500.html', error=e), 500
