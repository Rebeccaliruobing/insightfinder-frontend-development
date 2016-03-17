# -*- coding: utf-8 -*-

from __future__ import absolute_import

from flask import render_template
from ..core import ActionView


class MainView(ActionView):
    def index(self):
        return render_template('home.html')
