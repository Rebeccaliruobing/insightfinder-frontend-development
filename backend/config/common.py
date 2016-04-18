# -*- coding: utf-8 -*-

import os
from pathlib2 import PurePath


# 根据当前文件路径获得应用的路径及静态文件目录
root_dir = PurePath(os.path.dirname(__file__)).parent.parent
BASE_DIR = str(root_dir)
STATIC_FOLDER = str(root_dir/'static')

# 需初始化的模块
INIT_MODULES = [
    'backend.views',
    'backend.apis',
]

# Flask用于对Session中的数据进行加密的密钥, 与密码加密无关.
# SECRET_KEY = ''       # os.urandom(24)

# 调试时, 当静态文件由Webpack Server提供时的静态文件访问地址
# WEBPACK_ASSETS_DEBUG_URL = ''

# 是否启用prototype的功能
PROTOTYPE_ENABLED = False

# Mongo
MONGO_ENABLED = False
# MONGO_HOST # default: localhost
# MONGO_PORT # default: 27017
# MONGO_DBNAME = 'artbb'

# 管理控制台. 验证通过cookie完成
ADMIN_ENABLED = False
# ADMIN_URL_BASE = '/admin'               # 指定管理控制台的地址
# ADMIN_COOKIE_NAME = 'admin_pin_code'    # PIN码的cookie名称
# ADMIN_PIN_CODE = ''                   # 管理控制台的PIN码

# Submail 短信邮件发送平台, 当禁用时可通过日志查看发送信息.
SUBMAIL_ENABLED = False

# 七牛云存储
QINIU_ENABLED = False
