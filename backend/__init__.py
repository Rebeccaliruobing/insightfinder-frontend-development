# -*- coding: utf-8 -*-

from flask import Flask

# 全局app对象, 通过from .core import app获得
app = None


def create_app(config_name):
    """
    创建Flask App对象。获得App对象可以通过:
    - 模块的init_app传递app参数
    - 全局app对象, 通过from core import app获得
    - 通过import flask.current_app as app获得

    :param config_name: 配置信息. 配置对象在config目录中
    :return: Flask App对象
    """
    global app
    app = Flask(__name__)

    app.config.from_object('backend.config.common')
    app.config.from_object('backend.config.%s' % config_name)

    # 根据代码的结构设计, 设置相关路径如下:
    # - 添加根路径配置参数config['BASE_DIR']
    # - app.root_dir为backend目录, 以方便template文件的查找
    # - 静态文件路径通过配置参数设置, 缺省为根路径下的static
    app.static_folder = app.config['STATIC_FOLDER']
    app.template_folder = app.config['TEMPLATE_FOLDER']

    # 在加载其它模块前加载core模块
    from .core import init_app as core_init_app
    core_init_app(app)

    # 按照modules中指定的模块顺序加载子模块, 并初始化。
    import importlib
    modules = app.config['INIT_MODULES']
    for module_name in modules:
        module = importlib.import_module(module_name)
        if hasattr(module, 'init_app'):
            module.init_app(app)

    return app
