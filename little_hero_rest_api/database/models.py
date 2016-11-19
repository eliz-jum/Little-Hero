# reference
# http://flask-sqlalchemy.pocoo.org/2.1/quickstart/#simple-relationships

from little_hero_rest_api.database import db

class Child(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Child %r>' % self.name
