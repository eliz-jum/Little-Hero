from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import Avatar
from little_hero_rest_api.database.models import Child

class AvatarDAO(object):

    def create_avatar(data):
        name = data.get('name')
        child_id = data.get('child_id')
        child = Child.query.filter(child_id == Child.id).one()
        level = data.get('level')
        money = data.get('money')
        health = data.get('health')
        experience = data.get('experience')

        avatar = Avatar(name, child, level, money, health, experience)

        db.session.add(avatar)
        db.session.commit()