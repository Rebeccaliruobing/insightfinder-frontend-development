# -*- coding: utf-8 -*-

import os

DEBUG = False
TESTING = False

# SECRET_KEY用于对Session中的数据进行加密，生产环境需从环境变量中读取
SECRET_KEY = os.environ.get('FLASK_SECRET_KEY')
