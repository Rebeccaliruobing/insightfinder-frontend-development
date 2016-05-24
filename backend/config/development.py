# -*- coding: utf-8 -*-

import os
from pathlib2 import PurePath

DEBUG = True

SECRET_KEY = 'j[\xdc)U\xc5FM)\x89}\x8f\xb7\xd3*1&\x07\x82\xd0\xfa\x0c\xdc\xb7'

root_dir = PurePath(os.path.dirname(__file__)).parent.parent

# Webpack WebServer模式时，资源文件的url。{0}会被request中的host替换
if os.environ.get('WEBPACK_DEV_SERVER', False):
    TEMPLATE_FOLDER = str(root_dir/'static/dev')
