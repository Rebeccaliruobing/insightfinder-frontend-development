# -*- coding: utf-8 -*- 
from __future__ import unicode_literals

import datetime

import pytz


def now(*args, **kwargs):
    tz = kwargs.get('tz') or 'Asia/Shanghai'
    return datetime.datetime.now(tz=pytz.timezone(tz))
