# -*- coding: utf-8 -*-

from flask import render_template
from ..core import ActionView


class LiveMonitoringView(ActionView):
    def index(self):
        return render_template('liveMonitoring.html')
