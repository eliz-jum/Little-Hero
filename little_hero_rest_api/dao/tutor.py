from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import Tutor
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

    def update(self, id, data):
        password = data.get('password')
        mail = data.get('mail')

        query = db.session.query(Tutor).filter_by(id=id)

        if password:
            query.update({Tutor.password: password})
        if mail:
            query.update({Tutor.mail: mail})

        db.session.commit()
