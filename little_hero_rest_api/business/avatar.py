from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import Avatar
from little_hero_rest_api.database.models import Child


def create_avatar(data):
    name = data.get('name');
    child_id = data.get('child_id')
    child = Child.query.filter(child_id == Child.id).one()

    avatar = Avatar(name, child)

    db.session.add(avatar)
    db.session.commit()