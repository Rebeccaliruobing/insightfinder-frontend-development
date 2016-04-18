# -*- coding: utf-8 -*-
"""
    本模块定义了常用的正则表达式.
"""
import re

mobile = re.compile(
    r'^((?:0|86|17951)?'
    r'(?:13[0-9]|14[5,7]|15[0-3,5-9]|17[0,6-8]|18[0-9])'
    r'\d{8})$', re.IGNORECASE)

password = re.compile(
    r'^(?=.*?\d)(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!@#$%^&*_])'
    r'[A-Za-z\d!@#$%^&*_]{8,30}$')
vcode = re.compile(r'^(\d{6})$')
icode = re.compile(r'^([A-Za-z\d]{6})$')
