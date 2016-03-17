# -*- coding: utf-8 -*-

from __future__ import absolute_import

from flask import render_template, redirect
from ..core import ActionView


class MainView(ActionView):
    def index(self):
        return redirect('/monitoring')

    def monitoring(self):
        return render_template('home.html')

    def register_project(self):
        return render_template('home.html')

    def analysis(self):
        return render_template('home.html')

    def settings(self):
        return render_template('home.html')
