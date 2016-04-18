# -*- coding: utf-8 -*-
"""
    本模块提供了Rest Api方法参数定义, 及描述参数校验的装饰器.
"""

from __future__ import absolute_import

from functools import wraps
import six
from flask_restful import reqparse

# TODO: [REV] 该方法的参数校验时候可用于Html视图的参数校验


class Argument(reqparse.Argument):
    """
    Rest Api方法的参数定义描述类. 该类对flask_restful中的类Argument进行调整.

    在对Rest Api方法参数定义时, 主要需要对必选参数进行定义; 可选参数可不进行定义,
    以避免当可选参数很多时, 参数定义太多. 根据这种使用情况, Argument的required
    缺省值改为True.

    当为可选参数时, store_missing=True将未传递的参数解析成其对应的缺省值,如None;
    这会导致无法区分该参数的None是传递过来的,还是缺省值. 因而, 当store_missing
    未显示赋值时, 应使用False.

    当需要强类型的参数时, 可以通过指定type类型来进行转换, type参数可以是自定义转换
    函数; 也可以使用预定义的inputs中的转换函数.

    具体参数定义可参看:
    http://flask-restful.readthedocs.org/en/0.3.5/api.html#reqparse.Argument
    """
    def __init__(self, name, default=None, dest=None, required=True,
                 ignore=False, type=six.text_type, location=('json', 'values',),
                 choices=(), action='store', help=None, operators=('=',),
                 case_sensitive=True, store_missing=None, trim=False,
                 nullable=True):

        store_missing = False if store_missing is None else store_missing

        super(Argument, self).__init__(
            name, default=default, dest=dest, required=required,
            ignore=ignore, type=type, location=location,
            choices=choices, action=action, help=help, operators=operators,
            case_sensitive=case_sensitive, store_missing=store_missing, trim=trim,
            nullable=nullable)


def parse_arguments(*parse_args):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):

            parser = reqparse.RequestParser(bundle_errors=True)
            for argument in parse_args:
                parser.add_argument(argument)

            parsed_args = parser.parse_args()
            parsed_args.update(kwargs)

            return f(*args, **parsed_args)
        return decorated_function
    return decorator
