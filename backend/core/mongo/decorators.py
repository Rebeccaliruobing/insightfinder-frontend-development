# -*- coding: utf-8 -*- 
from __future__ import unicode_literals

from mongokat import Collection


def _generate_collection(collection, database, doc_cls, collection_cls=None):
    if not collection_cls:
        class Cls(Collection):
            __collection__ = collection
            document_class = doc_cls

        collection_cls = Cls

    collection_cls.document_class = doc_cls

    return collection_cls(database=database)


def register(collection=None, database=None, collection_class=None):
    """
    注册 Document
    Args:
        collection:
        database:
        collection_class:

    Returns:

    """
    def decorator(document_class):
        return _generate_collection(collection, database, document_class, collection_class)

    return decorator
