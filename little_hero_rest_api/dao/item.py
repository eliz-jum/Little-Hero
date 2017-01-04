from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import Item
from little_hero_rest_api.dao.generic import GenericDAO
import json

class ItemDAO(GenericDAO):

    def __init__(self):
        super().__init__(Item)

    def create(self, data):
        # price = data.get('price')
        # level = data.get('level')
        # clazz = data.get('clazz')
        # type = data.get('type')
        # imgSrc = data.get('imgSrc')
        # iconSrc = data.get('iconSrc')
        item = self.__create_item_from_dict(data)

        db.session.add(item)
        db.session.commit()

        return item

    def update(self, id, data):

        query = Item.query.filter_by(id=id)
        query.update(data)
        item = query.one()
        db.session.commit()
        return item

    """bulk update"""
    def bulk_update(self, data):
        list_of_items = []
        for dict in data:
            item = self.__create_item_from_dict(dict)
            list_of_items.append(item)
        Item.query.delete()
        db.session.add_all(list_of_items)
        db.session.commit()

    def __create_item_from_dict(self, data):
        price = data.get('price')
        level = data.get('level')
        clazz = data.get('clazz')
        type = data.get('type')
        imgSrc = data.get('imgSrc')
        iconSrc = data.get('iconSrc')
        item = Item(price, level, clazz, type, imgSrc, iconSrc)
        return item
