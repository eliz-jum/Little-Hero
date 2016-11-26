from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import Item
from little_hero_rest_api.dao.generic import GenericDAO


class ItemDAO(GenericDAO):

    def __init__(self):
        super().__init__(Item)

    def create(self, data):
        name = data.get('name')
        price = data.get('price')
        level = data.get('level')
        clazz = data.get('clazz')
        type = data.get('type')
        item = Item(name, price, level, clazz, type)

        db.session.add(item)
        db.session.commit()

    def update(self, id, data):
        name = data.get('name')
        price = data.get('price')
        level = data.get('level')
        clazz = data.get('clazz')
        type = data.get('type')

        query = db.session.query(Item).filter_by(id=id)

        if name:
            query.update({Item.name: name})
        if price:
            query.update({Item.price: price})
        if level:
            query.update({Item.level: level})
        if clazz:
            query.update({Item.clazz: clazz})
        if type:
            query.update({Item.type: type})

        db.session.commit()
