from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import Avatar
from little_hero_rest_api.dao.children import ChildDAO
from little_hero_rest_api.database.models import Child
from little_hero_rest_api.database.models import Tutor
from little_hero_rest_api.dao.tutor import TutorDAO
from little_hero_rest_api.dao.generic import GenericDAO


class AvatarDAO(GenericDAO):

    child_dao = ChildDAO()
    tutor_dao = TutorDAO()

    def __init__(self):
        super().__init__(Avatar)

    def get_all(self, child_id, tutor_id):
        if child_id and tutor_id:
            return Avatar.query.filter_by(child_id=child_id, tutor_id=tutor_id).all()
        if child_id:
            avatars = Avatar.query.filter_by(child_id=child_id).all()
            return avatars
        if tutor_id:
            return Avatar.query.filter_by(child_id=tutor_id).all()
        return super().get_all()

    def create(self, data):
        name = data.get('name')
        child_id = data.get('child_id')
        child = self.child_dao.get(child_id)
        tutor_id = data.get('tutor_id')
        tutor = None
        if tutor_id:
            tutor = self.tutor_dao.get(tutor_id)  # todo: jak nie ma to dać NOT_FOUND
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
        tutor_id = data.get('tutor_id')
        level = data.get('level')
        money = data.get('money')
        health = data.get('health')
        experience = data.get('experience')

        # query = db.session.query(Avatar).filter_by(id=id)
        query = Avatar.query.filter_by(id=id)

        if name:
            query.update({Avatar.name: name})
        if child_id:
#            child = self.child_dao.get(child_id)
            query.update({Avatar.child: child_id})
        if tutor_id:
#            tutor = self.tutor_dao.get(tutor_id)
            query.update({Avatar.tutor: tutor_id})
        if level:
            query.update({Avatar.level: level})
        if money:
            query.update({Avatar.money: money})
        if health:
            query.update({Avatar.health: health})
        if experience:
            query.update({Avatar.experience: experience})

        db.session.commit()
