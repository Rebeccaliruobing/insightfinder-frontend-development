# -*- coding: utf-8 -*-

from flask import render_template
from ..core import ActionView


class MainView(ActionView):
    def index(self):
        return render_template('index.html')

    def all(self, path=None):
        return render_template('index.html')
