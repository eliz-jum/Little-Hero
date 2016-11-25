# reference
# http://flask-sqlalchemy.pocoo.org/2.1/quickstart/#simple-relationships

from little_hero_rest_api.database import db


class Child(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))

    avatars = db.relationship('Avatar', back_populates='child', lazy='dynamic')

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Child %r>' % self.name


class Avatar(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))

    child_id = db.Column(db.Integer, db.ForeignKey('child.id'))
    child = db.relationship('Child', back_populates='avatars', lazy='joined')

    def __init__(self, name, child):
        self.name = name
        self.child = child

    def __repr__(self):
        return '<Avatar %r>' % self.name
