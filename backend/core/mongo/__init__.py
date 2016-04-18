# -*- coding: utf-8 -*-

"""提供访问Mongo数据库的简单ORM模型.

- 当前实现采取对Mongokat进行简单的封装。
- Mongokat由于对bson decode进行了定制，当前只支持pymongo 3.0.2。
  https://github.com/pricingassistant/mongokat
"""

# TODO: [IMP] structure应该在Collection中,否则collection使用会报错.
# TODO: [IMP] 去掉Field,使用tuple, 如:
# {
#    name: six.text_string
#    age: (int, true, 10)   # (type, required, default)
# }
# TODO: [IMP] 数据初始值可以重写KatDocument.__generate_skeleton 方法

import six
from mongokat import Collection, find_method, Document as KatDocument
from .decorators import *

__all__ = ['Collection', 'Document', 'Field', 'FieldValidateError', 'DocumentValidateError',
           'find_method', 'register']


class FieldValidateError(Exception):
    def __init__(self, name, *args, **kwargs):
        self.name = name
        super(FieldValidateError, self).__init__(*args, **kwargs)


class DocumentValidateError(Exception):
    def __init__(self, name, *args, **kwargs):
        self.name = name
        super(DocumentValidateError, self).__init__(*args, **kwargs)


class Field(object):
    def __init__(self, field_type=six.text_type, required=True, default=None):
        """

        Args:
            field_type:
                - int, float, long
                - bool
                - six.text_type, unicode, str
                - list
                - dict
                - ObjectId
            required:
            default:
        Returns:
        """

        self.field_type = field_type
        self.required = required
        self.default = default

    def get_default(self):
        return self.default

    def validate(self, value, label=None):

        if type(value) == self.field_type:
            return value

        if self.required and not value:
            raise FieldValidateError(label, "%s: 字段不能为空" % label)

        if isinstance(self.field_type, list):
            if not isinstance(value, list):
                raise FieldValidateError(label, "%s: 字段必须是数组类型" % label)
            field = self.field_type[0]
            result = []
            for v in value:
                result.append(field.validate(v, label=label))
            return result

        if isinstance(self.field_type, dict):
            if not isinstance(value, dict):
                raise FieldValidateError(label, "%s: 字段必须是字典类型" % label)
            result = value
            for name, field in self.field_type.items():
                result[name] = field.validate(value[name], label=name)
            return result

        try:
            return self.field_type(value)
        except TypeError as e:
            raise FieldValidateError(e.message)


class Document(KatDocument):
    """
        @register('user', database=db)
        class Person(Document):
            structure = {
                'name': Field(str),
                'children': Field([ObjectId]),
                'mother': Field({
                    '_id': Field(ObjectId),
                    'name': Field(str)
                }),
                'father': Field({
                    '_id': Field(ObjectId),
                    'name': Field(str)
                }, required=False)
            }

        @register('user', database=db)
        class Person(Document):
            structure = {
                'name': (str, True, '王小二'),
                'children': ([(string, True)], ),
                'mother': ({
                    '_id': (ObjectId, True),
                    'name': (str, True)
                }, True)
            }

        p = Person()
        p['name'] = 'name'
        p.save()


    参考: backend/models/articles.py

        @register('article', db)
        class Article(Document):
            STATUS_DRAFT = 'draft'
            STATUS_PUBLISH = 'publish'
            structure = {
                'title': Field(six.text_type),
                'content': Field(six.text_type),
                'status': Field(six.text_type, default=STATUS_DRAFT),

                'tags': Field([Field(six.text_type)], default=[]),
                'viewCount': Field(int, default=0),
                'dateCreation': Field(datetime.datetime, default=timezone.now),
                'dateExpired': Field(datetime.datetime, default=lambda doc: doc.get_value('dateCreation') + datetime.timedelta(days=7)),
            }

    """
    default_values = {}
    structure = {}

    __default_call_stack__ = {}

    def __init__(self, *args, **kwargs):
        self._set_default()
        super(Document, self).__init__(*args, **kwargs)

    # 设置默认值
    def _set_default(self):
        call_stack = {}
        for name, field in type(self).structure.items():
            if isinstance(field, tuple):
                default = Field(*field).get_default()
            elif isinstance(field, Field):
                default = field.get_default()
            else:
                raise DocumentValidateError(name, "定义字段必须使用 Field 或者 tuple 类型")

            # default值是函数
            if not hasattr(default, '__call__'):
                self[name] = default
            else:
                call_stack[name] = self._stack_call(name, default)

        self.__default_call_stack__ = call_stack

        for name, call in call_stack.items():
            self[name] = call()

    def _stack_call(self, name, call):
        def wrapper_call():
            if name not in self:
                self[name] = call(self)
            return self[name]

        return wrapper_call

    def get_value(self, name):
        """
            获取字段值
        Args:
            name: 字段名称

        Returns:

        """
        if name in self.__default_call_stack__:
            return self.__default_call_stack__[name]()
        else:
            return self[name]

    def validate(self):
        for name, field in self.structure.items():
            if isinstance(field, tuple):
                self[name] = Field(*field).validate(self.get(name), name)
            elif isinstance(field, Field):
                self[name] = field.validate(self.get(name), name)
        return True
