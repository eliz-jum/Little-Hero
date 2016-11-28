from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import AvatarItem
from little_hero_rest_api.dao.generic import GenericDAO
#from little_hero_rest_api.dao.item import ItemDAO


#item_dao = ItemDAO()

class AvatarItemDAO(GenericDAO):

    def __init__(self):
        super().__init__(AvatarItem)

    def create(self, data):
        avatar_id = data.get('avatar_id')
        item_id = data.get('item_id')
        #item = item_dao.get(item_id)
        state = data.get('state') # enum?
        avatar_item = AvatarItem(avatar_id, item_id, state)

        db.session.add(avatar_item)
        db.session.commit()

    def update(self, id, data):
        avatar_id = data.get('avatar_id')
        item_id = data.get('item_id')
        # item = item_dao.get(item_id)
        state = data.get('state')  # enum

        # query = db.session.query(Avatar).filter_by(id=id)
        query = AvatarItem.query.filter_by(id=id)

        if avatar_id:
            query.update({AvatarItem.id: avatar_id})

        db.session.commit()