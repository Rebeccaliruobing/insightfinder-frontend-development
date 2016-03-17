# -*- coding: utf-8 -*-

import os


class Config(object):
    """
    配置信息的基类, 只有大写的变量才会保存到app.config中.
    """

    # 是否启用prototype的功能
    CORE_PROTOTYPE = True

    # 禁用wtform提供的csrf安全保护
    # WTF_CSRF_ENABLED = False

    @staticmethod
    def init_app(app):
        pass


class DevelopmentConfig(Config):
    DEBUG = True

    # SECRET_KEY用于对Session中的数据进行加密, os.urandom(24)
    SECRET_KEY = 'j[\xdc)U\xc5FM)\x89}\x8f\xb7\xd3*1&\x07\x82\xd0\xfa\x0c\xdc\xb7'

    # Webpack WebServer模式时，资源文件的url。{0}会被request中的host替换
    if os.environ.get('WEBPACK_DEV_SERVER', False):
        WEBPACK_ASSETS_DEBUG_URL = 'http://{0}:10086/static/'


class TestingConfig(Config):
    DEBUG = True
    TESTING = True

    SECRET_KEY = 'j[\xdc)U\xc5FM)\x89}\x8f\xb7\xd3*1&\x07\x82\xd0\xfa\x0c\xdc\xb7'


class ProductionConfig(Config):
    DEBUG = False
    TESTING = False

    # SECRET_KEY用于对Session中的数据进行加密，生产环境需从环境变量中读取
    SECRET_KEY = os.environ.get('FLASK_SECRET_KEY')


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
