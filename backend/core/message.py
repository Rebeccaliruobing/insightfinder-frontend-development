# -*- coding: utf-8 -*-

from flask import current_app
from .submail.message_xsend import MESSAGEXsend


def send_sms_vcode(mobile, code):
    """
    通过短信网关发送短信验证码
    :param mobile: 手机号
    :param code: 验证码
    :return:
    """

    # TODO: [Perf] 是否需要采用异步方式
    if current_app.config.get('SUBMAIL_ENABLED', False):
        appid = current_app.config['SUBMAIL_APPID']
        signature = current_app.config['SUBMAIL_SIGNATURE']
        project = current_app.config['SUBMAIL_PROJECT_CODE']
        submail = MESSAGEXsend({
            "appid": appid,
            "appkey": signature,
            "sign_type": 'md5'
        })
        submail.add_to(mobile)
        submail.set_project(project)
        submail.add_var('code', code)

        return submail.xsend()
    else:
        current_app.logger.info("{0}:{1}".format(mobile, code))
