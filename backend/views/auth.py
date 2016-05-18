# -*- coding: utf-8 -*-

from flask import render_template, redirect
from ..core import ActionView


class AuthView(ActionView):
    def index(self):
        return redirect('/auth/login')

    def login(self):
        return render_template('auth.html')
