# -*- coding: utf-8 -*-

import os
from pathlib2 import PurePath

# 需初始化的模块
INIT_MODULES = [
    'backend.views',
    'backend.apis',
]

root_dir = PurePath(os.path.dirname(__file__)).parent.parent

# 根据当前文件路径获得应用的路径及静态文件目录
BASE_DIR = str(root_dir)
STATIC_FOLDER = str(root_dir/'static')
TEMPLATE_FOLDER = str(root_dir/'static')

# Flask用于对Session中的数据进行加密的密钥, 与密码加密无关.
# 生成环境从FLASK_SECRET_KEY环境变量中获得
# SECRET_KEY = ''       # os.urandom(24)

# 在development环境中, 当静态文件由Webpack Server提供时的静态文件访问地址.
# WEBPACK_ASSETS_DEBUG_URL = 'http://{0}:10086/static/'

# 是否启用原型设计的辅助功能
PROTOTYPE_ENABLED = False
