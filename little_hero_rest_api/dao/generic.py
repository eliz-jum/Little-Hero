from little_hero_rest_api.database import db


class GenericDAO(object):

    def __init__(self, db_model):
        self.db_model = db_model

    def get(self, id):
        model = self.db_model.query.filter(self.db_model.id == id).one()
        return model

    def get_all(self):
        children = self.db_model.query.all()
        return children

    def delete(self, id):
        model = self.get(id)
        db.session.delete(model)
        db.session.commit()