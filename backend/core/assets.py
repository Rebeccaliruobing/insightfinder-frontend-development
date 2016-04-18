# -*- coding: utf-8 -*-

"""
    根据Webpack生成manifest.json中的资源文件映射表，将资源文件的地址用
    包括hash值的地址替换。
    https://github.com/nickjj/flask-webpack
"""

import json
from flask import request


class Assets(object):
    def __init__(self, app=None):
        self.app = app
        self.manifest = None
        self.assets_url = None
        self.assets_debug_url = None

        if app is not None:
            self.init_app(app)

    def init_app(self, app):

        assert app is not None
        self.app = app

        # 开发与部署环境使用不同的manifest文件，manifest-dev.json不迁入到git中。
        self.manifest = 'manifest-dev.json' if app.debug else 'manifest.json'
        self.assets_url = '/static/'

        # 如使用Webpack WebServer时, 需指定资源文件的url模板。
        self.assets_debug_url = app.config.get('WEBPACK_ASSETS_DEBUG_URL', None)

        self._set_assets_path()

        # 在开发模式时，每次请求都重新获取资源文件路径映射表
        if app.debug:
            app.before_request(self._set_assets_path)

        app.add_template_global(self.javascript_tag)
        app.add_template_global(self.stylesheet_tag)
        app.add_template_global(self.asset_url_for)
        app.add_template_global(self.asset_public_path)

    def _set_assets_path(self):
        """
        从manifest.json文件中读取资源文件路径的映射表。
        """
        try:
            with self.app.open_resource(self.manifest, 'r') as stats_json:
                self.assets = json.load(stats_json)
        except IOError:
            raise RuntimeError(
                u"需要设置配置参数'WEBPACK_MANIFEST_PATH'，"
                u"该配置指向资源路径的映射json文件。")

    def javascript_tag(self, *args):
        """
        生成html javascript标签。
        :param args: 一个或多个js文件的名称
        :return: 包括js文件的Html script标签
        """
        tags = []

        for arg in args:
            asset_path = self.asset_url_for('{0}.js'.format(arg))
            if asset_path:
                tags.append('<script src="{0}"></script>'.format(asset_path))

        return '\n'.join(tags)

    def stylesheet_tag(self, *args):
        """
        生成html css样式标签。
        :param args: 一个或多个css文件的名称
        :return: 包括css文件的Html Link标签
        """
        tags = []

        for arg in args:
            asset_path = self.asset_url_for('{0}.css'.format(arg))
            if asset_path:
                tags.append(
                    '<link rel="stylesheet" href="{0}">'.format(asset_path))

        return '\n'.join(tags)

    def asset_url_for(self, asset):
        """
        获得资源文件的hash地址并拼接成对应的资源url返回。如指定的asset地址为以
        /开头的绝对地址，则返回传入值。
        :param asset: 资源的相对路径
        :type asset: str
        :return: 资源的url或传入值
        """
        if '//' in asset:
            return asset

        # 如果是debug环境，使用request中的host来替换localhost
        # assets_url = self.assets_url
        #
        # if self.app.debug and self.assets_debug_url:
        #     host = request.host.split(':')[0]
        #     assets_url = self.assets_debug_url.format(host)

        for key in self.assets:
            if key == asset:
                # return '{0}{1}'.format(assets_url, self.assets[key])
                return self.assets[key]

        # 如没有对应的资源文件，则返回传入值以方便查找错误的文件
        return asset

    def asset_public_path(self):
        """
        用于在页面中添加资源文件的根地址，如在页面模板文件中添加：
        <script>
            window.assetsPublicPath = '{{ asset_public_path() }}';
        </script>
        Webpack前端代码需使用该根地址作为资源文件的根地址。
        TODO: 是否还需要?
        """
        if self.app.debug and self.assets_debug_url:
            host = request.host.split(':')[0]
            return self.assets_debug_url.format(host)
        else:
            return self.assets_url
