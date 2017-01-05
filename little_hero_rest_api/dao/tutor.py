from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import Tutor
from little_hero_rest_api.database.models import Avatar
from little_hero_rest_api.database.models import Child
from little_hero_rest_api.dao.generic import GenericDAO


class TutorDAO(GenericDAO):

    def __init__(self):
        super().__init__(Tutor)

    def create(self, data):
        login = data.get('login')
        password = data.get('password')
        mail = data.get('mail')
        tutor = Tutor(login, password, mail)

        db.session.add(tutor)
        db.session.commit()

        return tutor

    def update(self, id, data):

        query = Tutor.query.filter_by(id=id)
        query.update(data)
        tutor = query.one()

        db.session.commit()

        return tutor

    def get_all_children(self, id):
        result = db.session.query(Child, Tutor, Avatar).\
            filter(Tutor.id == Avatar.tutor_id).\
            filter(Child.id == Avatar.child_id).\
            filter(Tutor.id == id).all()

        children_set = set()
        for (child, tutor, avatar) in result:
            children_set.add(child)
        return list(children_set)
