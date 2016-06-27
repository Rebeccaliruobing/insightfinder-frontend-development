# -*- coding: utf-8 -*-

from flask import render_template, jsonify, request
from ..core import ActionView


class MainView(ActionView):
    def index(self):
        return render_template('index.jsp')

    def all(self, path=None):
        return render_template('index.jsp')

    def upload(self):
        # request.files
        return jsonify({
            'success': True
        })
