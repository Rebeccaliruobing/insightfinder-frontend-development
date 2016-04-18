# -*- coding: utf-8 -*-

"""
    本模块定义了在进行RestApi方法参数进行校验转换时,使用的转换函数定义.
    http://flask-restful.readthedocs.org/en/0.3.5/api.html#module-inputs
"""
from __future__ import absolute_import
from email.utils import parseaddr


# 引入flask_restful中的校验函数
from flask_restful.inputs import *

from .. import regex


class AllowEmpty(object):
    """如value为空字符串, 则返回default值; 否则继续进行判断
    """
    def __init__(self, ftype, default=None):
        self.ftype = ftype
        self.default = default

    def __call__(self, value):
        if value == '':
            return self.default
        else:
            return self.ftype(value)


def password(value):
    """检查密码是否满足复杂度的要求
    :param string value:
    :returns:
    :raises: ValueError
    """
    if not regex.password.search(value):
        message = u'密码复杂度不能满足要求'
        raise ValueError(message)
    return value


def mobile(value):
    """校验是否是手机号码
    :param string value:
    :returns:
    :raises: ValueError
    """
    if not regex.mobile.search(value):
        message = u'手机号码格式不正确'
        raise ValueError(message)
    return value


def email_or_mobile(value):
    """校验是否是手机号码或邮件地址
    :param string value:
    :returns:
    :raises: ValueError
    """
    if not regex.mobile.search(value) and not parseaddr(value):
        message = u'手机号码格式不正确'
        raise ValueError(message)
    return value


def vcode(value):
    """校验是否是正确的验证码格式
    :param string value:
    :returns:
    :raises: ValueError
    """
    if not regex.vcode.search(value):
        message = u'验证码格式不正确'
        raise ValueError(message)
    return value


def icode(value):
    """校验是否是正确的邀请码格式
    :param string value:
    :returns:
    :raises: ValueError
    """
    if not regex.icode.search(value):
        message = u'邀请码格式不正确'
        raise ValueError(message)
    return value
