#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
from flask.ext.script import Manager, Server
from backend import create_app

config = os.getenv('FLASK_CONFIG') or 'default'
app = create_app(config)

manager = Manager(app)

# 开发时，服务使用本机的所有IP，以便于通过网络访问。
if config != 'production':
    manager.add_command('runserver', Server(host='0.0.0.0'))

if __name__ == '__main__':
    manager.run()
