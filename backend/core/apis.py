# -*- coding: utf-8 -*-

""" 本模块提供了以类方式实现的Rest Api的基类. 支持2种方式:
    1. Restful API, 集成类可以通过定义rest_get, rest_post, put, delete方法,
      来实现标准restful api对资源的CRUD操作.
    2. 在url中指定action参数, 用于指定需调用的类的方法, 方法名为action.

    同时, 当返回数据为mongodb bson类型时, 进行特殊序列化处理.
"""

from __future__ import absolute_import

from flask import json, current_app as app
from flask_restful import Resource, abort
from werkzeug.wrappers import Response


__all__ = ['ActionApi']

# TODO: [REV] 如何统一Http 200情况下的错误代码
# TODO: [DEBUG] 需要对非mongodb情况下的调试


def _convert_default(obj):
    """对bson.json_util中的default转换进行调整:
       - 使用hashid替换objectId(oid)
         https://github.com/davidaurelio/hashids-python
         http://hashids.org/
       - 不包括数据类型, 如$date, $oid等?
    """
    # TODO: [IMP] datetime?
    from bson import json_util
    from bson.objectid import ObjectId

    if isinstance(obj, ObjectId):
        from . import hashids
        return hashids.encode_hex(str(obj))
    return json_util.default(obj)


def _json_convert(obj):
    """Recursive helper method that converts BSON types so they can be
    converted into json.
    """
    from bson import SON
    from bson.py3compat import iteritems, text_type

    if hasattr(obj, 'iteritems') or hasattr(obj, 'items'):  # PY3 support
        return SON(((k, _json_convert(v)) for k, v in iteritems(obj)))
    elif hasattr(obj, '__iter__') and not isinstance(obj, (text_type, bytes)):
        return list((_json_convert(v) for v in obj))
    try:
        return _convert_default(obj)
    except TypeError:
        return obj


def _response_convert(obj, data=None):
    """将data根据其类型转换成json后, 作为obj的data字段返回"""

    obj['data'] = data

    if not app.config.get('MONGO_ENABLED', False):
        return obj

    # 如果data不是mongodb的数据, 则不需要进行bson格式转换.
    from .mongo import Document
    from pymongo.cursor import Cursor
    if not isinstance(data, Document) and not isinstance(data, Cursor):
        return obj

    # 为了避免重复的json string => object的转换, 获得json string后直接创建
    # response对象返回.
    return Response(json.dumps(_json_convert(obj)),
                    mimetype='application/json')


class ActionApi(Resource):
    """Api的基类。
    将Url路由中指定的action参数映射到同名的方法。
    如子类需要按照Rest的方式使用get, post等方法, 需要先调用dispatch_action
    来分配方法调用.

    方法的返回值, 需要按照固定的格式, 会有3种情况:
    - HTTP 错误, 返回内容为传入的值, 不做变化.
    - HTTP 正常，但方法调用有错误或提示,
        {
            success: False,
            code: code,         # 自定义错误代码, 与http code无关
            message: message    # 错误消息
        }
    - HTTP正常，返回正确数据
        {
            success: True,
            data: data          # 数据
        }
    根据不同的返回值, 需要使用不同的返回来创建对应的消息
    - HTTP 错误，可以返回(data, code, header)的tuple
    - HTTP 正常，方法错误，调用fail方法生成对应格式数据
    - HTTP 正常，返回数据，调用done方法生成对应格式数据
    """
    # TODO: [IMP] 添加获得其它未使用parse_argument定义的参数的方法

    # Restful api, 因为get, post作为action的分发器, 需其它名字的方法作为get, post
    REST_GET = 'rest_get'
    REST_POST = 'rest_post'

    def get(self, action=None, *args, **kwargs):
        action = action or self.REST_GET
        return self.dispatch_action(action, *args, **kwargs)

    def post(self, action=None, *args, **kwargs):
        action = action or self.REST_POST
        return self.dispatch_action(action, *args, **kwargs)

    @staticmethod
    def done(data=None):
        return _response_convert({
            'success': True,
            'data': None
        }, data)

    @staticmethod
    def fail(message=None, data=None, code=10400):
        return _response_convert({
            'success': False,
            'message': message,
            'data': None,
            'code': code
        }, data)

    def dispatch_action(self, action, *args, **kwargs):

        # if action is action-name, try to find method with action_name
        action = action.lower().replace('-', '_')
        meth = getattr(self, action, None)
        if meth is None:
            abort(405, message="The action is not allowed.")

        resp = meth(*args, **kwargs)
        return resp
