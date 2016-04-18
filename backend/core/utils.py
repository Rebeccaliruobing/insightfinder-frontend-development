# -*- coding: utf-8 -*-

"""
常用的通用方法
"""
from __future__ import absolute_import

import string
import random


def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    """
    随机id生成器
    http://stackoverflow.com/questions/2257441/random-string-generation-with-upper-case-letters-and-digits-in-python/23728630#23728630
    """
    return ''.join(random.SystemRandom().choice(chars) for _ in range(size))
