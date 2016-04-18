# -*- coding: utf-8 -*-

from flask import request, send_file

from io import BytesIO
from PIL import Image, ImageDraw
from ..reqparse import Argument, parse_arguments


# TODO: [REV] 是否可以改成一个生成炫酷图片的代码?
# app.add_url_rule("/prototype/images", view_func=image_placeholder)

@parse_arguments(
    Argument('w', dest='width', type=int),
    Argument('h', dest='height', type=int),
)
def image_placeholder(width, height):
    """用于生成原型开发时的占位图片。图片宽度和高度及其他参数通过querystring中指定。
    :param width: 图片宽度
    :param height: 图片高度
    """
    image = Image.new('RGB', (width, height), color=(117, 117, 117))
    draw = ImageDraw.Draw(image)

    text = '{}X{}'.format(width, height)
    text_width, text_height = draw.textsize(text)

    if text_width < width and text_height < height:
        text_top = (height - text_height) // 2
        text_left = (width - text_width) // 2
        draw.text((text_left, text_top), text, fill=(221, 221, 221))

    content = BytesIO()
    image.save(content, 'PNG')
    content.seek(0)

    return send_file(content, mimetype='image/png')
