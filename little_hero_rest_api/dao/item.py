from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import Item
from little_hero_rest_api.database.models import AvatarItem
from little_hero_rest_api.dao.generic import GenericDAO


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

    def get_all(self, avatar_id, state):
        query = db.session.query(Item, AvatarItem) \
            .filter(AvatarItem.item_id == Item.id)
        if avatar_id:
            query = query.filter(AvatarItem.avatar_id == avatar_id)
        if state:
            query = query.filter(AvatarItem.state == state)
        result = query.all()

        item_set = set()
        for (item, avatar_item) in result:
            item_set.add(item)
        return list(item_set)

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
