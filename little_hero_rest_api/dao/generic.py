from little_hero_rest_api.database import db


class GenericDAO(object):

    def __init__(self, db_model):
        self.db_model = db_model

    def get(self, id):
        entity = self.db_model.query.filter(self.db_model.id == id).one()
        return entity

    def get_all(self):
        all = self.db_model.query.all()
        return all

    def update(self, id, data):
        query = self.db_model.query.filter_by(id=id)
        query.update(data)
        entity = query.one()

        db.session.commit()
        return entity

    def delete(self, id):
        model = self.get(id)
        db.session.delete(model)
        db.session.commit()