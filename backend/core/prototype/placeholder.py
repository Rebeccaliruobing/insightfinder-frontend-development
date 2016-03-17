# -*- coding: utf-8 -*-

from flask import request, send_file

from flask.ext.wtf import Form
from werkzeug.exceptions import BadRequest
from wtforms import IntegerField
from wtforms.validators import DataRequired
from io import BytesIO
from PIL import Image, ImageDraw


class ImageForm(Form):
    w = IntegerField('width', validators=[DataRequired()])
    h = IntegerField('height', validators=[DataRequired()])

    def generate(self, image_format='PNG'):

        width = self.w.data
        height = self.h.data
        image = Image.new('RGB', (width, height), color=(117, 117, 117))
        draw = ImageDraw.Draw(image)

        text = '{}X{}'.format(width, height)
        text_width, text_height = draw.textsize(text)

        if text_width < width and text_height < height:
            text_top = (height - text_height) // 2
            text_left = (width - text_width) // 2
            draw.text((text_left, text_top), text, fill=(221, 221, 221))

        content = BytesIO()
        image.save(content, image_format)
        content.seek(0)
        return content


def image_placeholder():
    """用于生成原型开发时的占位图片。图片宽度和高度及其他参数通过querystring中指定。
       ``w`` 图片宽度
       ``h`` 图片高度
    """
    form = ImageForm(formdata=request.args, csrf_enabled=False)

    if not form.validate():
        raise BadRequest(form.errors)

    return send_file(form.generate(), mimetype='image/png')
