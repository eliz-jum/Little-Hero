from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import Child
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

    # def delete(self, child_id):
    #     child = self.get(child_id)
    #     db.session.delete(child)
    #     db.session.commit()