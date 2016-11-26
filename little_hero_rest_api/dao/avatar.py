from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import Avatar
from little_hero_rest_api.dao.children import ChildDAO
from little_hero_rest_api.dao.tutor import TutorDAO
from little_hero_rest_api.dao.generic import GenericDAO


class AvatarDAO(GenericDAO):

    child_dao = ChildDAO()
    tutor_dao = TutorDAO()

    def __init__(self):
        super().__init__(Avatar)

    def create(self, data):
        name = data.get('name')
        child_id = data.get('child_id')
        child = self.child_dao.get(child_id)
        tutor_id = data.get('tutor_id')
        tutor = self.tutor_dao.get(tutor_id)
        level = data.get('level')
        money = data.get('money')
        health = data.get('health')
        experience = data.get('experience')

        avatar = Avatar(name, child, tutor, level, money, health, experience)

        db.session.add(avatar)
        db.session.commit()

    def update(self, id, data):
        name = data.get('name')
        child_id = data.get('child_id')
        child = self.child_dao.get(child_id)
        tutor_id = data.get('tutor_id')
        tutor = self.tutor_dao.get(tutor_id)
        level = data.get('level')
        money = data.get('money')
        health = data.get('health')
        experience = data.get('experience')

        query = db.session.query(Avatar).filter_by(id=id)

        if name:
            query.update({Avatar.name: name})
        if child_id:
            query.update({Avatar.child: child})
        if tutor_id:
            query.update({Avatar.tutor: tutor})
        if level:
            query.update({Avatar.level: level})
        if money:
            query.update({Avatar.money: money})
        if health:
            query.update({Avatar.health: health})
        if experience:
            query.update({Avatar.experience: experience})

        db.session.commit()