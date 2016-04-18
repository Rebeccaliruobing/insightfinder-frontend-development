# -*- coding: utf-8 -*-

from __future__ import absolute_import

from flask import render_template, redirect
from ..core import ActionView


class MainView(ActionView):
    def index(self, path):
        return render_template('home.html')
