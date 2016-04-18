# -*- coding: utf-8 -*-
"""
    本模块提供了以类方式实现的页面视图的基类。
"""

from __future__ import absolute_import
from flask import abort
from flask.views import MethodView


class ActionView(MethodView):
    """页面视图的基类。
    将Url路由中指定的action参数映射到类方法。只支持Http的GET和POST方法。
    """
    methods = ['GET', 'POST']

    def get(self, action=None, *args, **kwargs):
        return self.dispatch_action(action, *args, **kwargs)

    def post(self, action=None, *args, **kwargs):
        return self.dispatch_action(action, *args, **kwargs)

    def dispatch_action(self, action, *args, **kwargs):
        action = (action or 'index').lower().replace("-", "_")
        if not hasattr(self, action):
            abort(404)
        return getattr(self, action)(*args, **kwargs)
