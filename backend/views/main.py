# -*- coding: utf-8 -*-

from __future__ import absolute_import

from flask import render_template, redirect
from ..core import ActionView


class MainView(ActionView):
    def index(self):
        return redirect('/monitoring')

    def signin(self, path):
        return render_template('signin.html')

    def monitoring(self, path):
        return render_template('home.html')

    def projects(self, path):
        return render_template('home.html')

    def summary(self, path):
        return render_template('home.html')

    def live(self, path):
        return render_template('home.html')

    def analysis(self, path):
        return render_template('home.html')

    def settings(self, path):
        return render_template('home.html')
