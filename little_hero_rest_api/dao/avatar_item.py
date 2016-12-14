from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import AvatarItem
from little_hero_rest_api.dao.generic import GenericDAO
#from little_hero_rest_api.dao.item import ItemDAO


#item_dao = ItemDAO()

class AvatarItemDAO(GenericDAO):

    def __init__(self):
        super().__init__(AvatarItem)

    def get_all(self, avatar_id, item_id, state):
        if avatar_id and item_id and state:
            return AvatarItem.query.filter_by(avatar_id=avatar_id, item_id=item_id, state=state).all()
        if avatar_id and item_id:
            return AvatarItem.query.filter_by(avatar_id=avatar_id, item_id=item_id).all()
        if avatar_id and state:
            return AvatarItem.query.filter_by(avatar_id=avatar_id, state=state).all()
        if item_id and state:
            return AvatarItem.query.filter_by(item_id=item_id, state=state).all()
        if avatar_id:
            return AvatarItem.query.filter_by(avatar_id=avatar_id).all()
        if item_id:
            return AvatarItem.query.filter_by(item_id=item_id).all()
        if state:
            return AvatarItem.query.filter_by(state=state).all()

        return super().get_all()

    def create(self, data):
        avatar_id = data.get('avatar_id')
        item_id = data.get('item_id')
        #item = item_dao.get(item_id)
        state = data.get('state') # enum?
        avatar_item = AvatarItem(avatar_id, item_id, state)

        db.session.add(avatar_item)
        db.session.commit()

        return avatar_item

    def update(self, id, data):
        query = AvatarItem.query.filter_by(id=id)
        query.update(data)
        avatar_item = query.one()

        db.session.commit()

        return avatar_item