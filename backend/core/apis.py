# -*- coding: utf-8 -*-
"""
    本模块提供了以类方式实现的Rest Api的基类及对Api参数进行校验的方法。
"""

from __future__ import absolute_import, unicode_literals

from flask.ext.restful import Resource, abort


class ActionApi(Resource):
    """Api的基类。
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
