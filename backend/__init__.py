# -*- coding: utf-8 -*-

from __future__ import absolute_import

import importlib
from flask import Flask
from config import config


# 当系统启动时，modules列表中的package会被系统加载。
modules = [
    'backend.views',
    # 'backend.api',
]


def create_app(config_name):

    app = Flask(__name__, static_folder='../static')
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    # TODO: 如何注册apis的路由接口
    # from .core import api
    from .core import init_app as core_init_app
    core_init_app(app)

    # 加载modules中指定的包列表，并初始化api及app接口。
    for module_name in modules:
        module = importlib.import_module(module_name)
        if hasattr(module, 'init_app'):
            module.init_app(app)
        # if hasattr(module, 'init_api'):
        #     module.init_api(api)

    return app
