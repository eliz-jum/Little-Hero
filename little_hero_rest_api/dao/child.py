from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import Child
from little_hero_rest_api.database.models import Tutor
from little_hero_rest_api.database.models import Avatar
from little_hero_rest_api.dao.generic import GenericDAO


class ChildDAO(GenericDAO):

    # def get(self, child_id):
    #     child = Child.query.filter(Child.id == child_id).one()
    #     return child
    #
    # def get_all(self):
    #     children = Child.query.all()
    #     return children

    def __init__(self):
        super().__init__(Child)

    def create(self, data):
        login = data.get('login')
        nickname = data.get('nickname')
        password = data.get('password')
        mail = data.get('mail')
        child = Child(login, nickname, password, mail)

        #child_id = data.get('id')
        #if child_id: #if child_id not None    <---- Do I need this?
        #    child.id = child_id

        db.session.add(child)
        db.session.commit()

        return child

    # def delete(self, child_id):
    #     child = self.get(child_id)
    #     db.session.delete(child)
    #     db.session.commit()

    def update(self, id, data):

        query = Child.query.filter_by(id=id)
        query.update(data)
        child = query.one()

        db.session.commit()

        return child

    def get_all_tutors(self, id):
        result = db.session.query(Child, Tutor, Avatar). \
            filter(Tutor.id == Avatar.tutor_id). \
            filter(Child.id == Avatar.child_id). \
            filter(Child.id == id).all()

        tutor_set = set()
        for (child, tutor, avatar) in result:
            tutor_set.add(tutor)
        return list(tutor_set)

    def get_password_hash(self, login):
        child = Child.query.filter_by(login=login).one()
        password_hash = child.password
        return password_hash
