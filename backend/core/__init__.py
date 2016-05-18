# -*- coding: utf-8 -*-
"""
    core模块中对系统使用的主要组件根据环境配置信息进行初始化, 同时提供了基类及
    辅助函数. 包括如下:

    - 数据库db, Rest API接口对象api的初始化
    - 设置全局错误处理函数, html及json
    - 为支持cache, 对静态资源文件进行映射的处理
    - 编写html视图的基类ActionView, 及Rest API的基类ActionApi
    - 其它辅助方法
"""
from __future__ import absolute_import

from hashids import Hashids
from flask import Blueprint
from flask_restful import Api

from .views import ActionView
from .apis import ActionApi
from .utils import id_generator

# 导入子模块的函数时, 需确保不使用该函数时, 子模块不会转载.
__all__ = ['init_app', 'api', 'db', 'hashids',
           'ActionApi', 'ActionView',
           'id_generator']

# 定义全局变量以方便在其它模块中引用

api = None          # rest api对象, 用于注册api路由及函数
db = None           # database, mongodb或其它类型数据库, 或None
hashids = None      # 用于将非机密的id进行混淆及解析
asset = None        # 用于生成静态资源的对象


def init_app(app):

    global api
    global db
    global hashids
    global asset

    # 全局错误处理函数
    from .errors import errors_bp
    app.register_blueprint(errors_bp)

    # Restful Api
    api_bp = Blueprint('api', __name__ + 'api', url_prefix='/api')
    api = Api(api_bp, catch_all_404s=True)
    app.register_blueprint(api_bp)

    hashids = Hashids(salt='OnlyParanoidCanSurvive')

    # 初始化资源文件处理组件
    from .assets import Assets
    asset = Assets()
    asset.init_app(app)

    # 开发时用于原型设计的组件
    if app.config.get('PROTOTYPE_ENABLED', False):
        from .prototype import clorem, avatars, wireframes

        app.add_template_global(clorem)
        app.add_template_global(avatars)
        app.add_template_global(wireframes)
