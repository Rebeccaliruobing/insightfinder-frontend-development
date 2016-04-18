# -*- coding: utf-8 -*-

"""
用于内部进行管理的控制台. 控制台可以支持与主应用分开部署的方式.
"""
from functools import wraps
from flask import render_template, request, session, redirect
from flask import current_app as app
from flask_restful import abort


__all__ = ['need_authenticated', 'admin_view', 'logoff_view']


def _is_authenticated():

    pin = app.config['ADMIN_PIN_CODE']
    cookie_name = app.config['ADMIN_COOKIE_NAME']

    authenticated = False

    if pin is None:
        return True

    if cookie_name in session and session[cookie_name] == pin:
        authenticated = True

    return authenticated


def need_authenticated():
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not _is_authenticated():
                abort(401)

            return f(*args, **kwargs)
        return decorated_function
    return decorator


def admin_view(path=None):

    pin = app.config['ADMIN_PIN_CODE']
    cookie_name = app.config['ADMIN_COOKIE_NAME']

    if request.method == 'POST' and request.form['pin_code'] == pin:
        session[cookie_name] = pin
        return redirect(request.base_url)

    authenticated = _is_authenticated()

    if authenticated:
        return render_template('admin/index.html')
    else:
        return render_template('admin/login.html')


def logoff_view():

    cookie_name = app.config['ADMIN_COOKIE_NAME']
    session[cookie_name] = None
    base = app.config.get('ADMIN_URL_BASE', '/admin')

    return redirect(base)

