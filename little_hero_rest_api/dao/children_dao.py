from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import Child

def create_child(data):
    name = data.get('name')
    child_id = data.get('id')

    child = Child(name)
    if child_id: #if child_id not None
        child.id = child_id

    db.session.add(child)
    db.session.commit()
