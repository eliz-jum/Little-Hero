from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import Item
from little_hero_rest_api.dao.generic import GenericDAO


class ItemDAO(GenericDAO):

    def __init__(self):
        super().__init__(Item)

    def create(self, data):
        price = data.get('price')
        level = data.get('level')
        clazz = data.get('clazz')
        type = data.get('type')
        imgSrc = data.get('imgSrc')
        iconSrc = data.get('iconSrc')
        item = Item(price, level, clazz, type, imgSrc, iconSrc)

        db.session.add(item)
        db.session.commit()

        return item

    def update(self, id, data):

        query = Item.query.filter_by(id=id)
        query.update(data)
        item = query.one()
        db.session.commit()
        return item
