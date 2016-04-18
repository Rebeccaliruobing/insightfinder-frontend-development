# -*- coding: utf-8 -*-

from .. import asset


def wireframes(name):
    name = name.lower().replace('_', '-')
    return asset.asset_url_for('artui/images/wireframe/%s.png' % name)


def avatars(name, small=False):
    name = name.lower().replace('_', '-')
    if small:
        return asset.asset_url_for('artui/images/avatar/small/%s.png' % name)
    else:
        return asset.asset_url_for('artui/images/avatar/large/%s.png' % name)
