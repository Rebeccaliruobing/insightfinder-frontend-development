# -*- coding: utf-8 -*- 
from __future__ import unicode_literals

import base64
import datetime
import os
import pytz
import sys

from backend import app
from qiniu import Auth, put_file as q_puth_file, put_stream as q_push_stream

ak = app.config['QINIU_AK']
sk = app.config['QINIU_SK']
q = Auth(ak, sk)


def put_file(request_file):
    token = q.upload_token(app.config['QINIU_BUCKET'])
    mimetype = request_file.mimetype
    stream = request_file.stream
    size = sys.getsizeof(stream)
    filename = request_file.filename
    key = datetime.datetime.now(tz=pytz.timezone('Asia/Shanghai')).strftime(
        "upload/%Y/%m%d/{0}/{1}".format(base64.b16encode(os.urandom(2)), request_file.filename))

    folder = app.config['BASE_DIR']
    folder = os.path.join(folder, "/".join(key.split("/")[:-1]))
    if not os.path.exists(folder):
        os.makedirs(folder)
    file_path = os.path.join(folder, filename)
    request_file.save(file_path)
    ret, info = q_puth_file(up_token=token, key=key, file_path=file_path, mime_type=mimetype)
    os.remove(file_path)
    os.rmdir(folder)
    ret['name'] = filename
    ret['size'] = size
    ret['mimetype'] = mimetype
    return ret


def get_url(key):
    base_url = 'http://%s/%s' % (app.config['QINIU_BUCKET_DOMAIN'], key)
    return base_url


def get_token():
    return q.upload_token(app.config['QINIU_BUCKET'])