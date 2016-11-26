# reference
# http://flask-sqlalchemy.pocoo.org/2.1/quickstart/#simple-relationships

from little_hero_rest_api.database import db


class BaseModel(db.Model):
    __abstract__ = True #sqlAlchemy will not create table for this model
    id = db.Column(db.Integer, primary_key=True)


class Child(BaseModel):
    login = db.Column(db.String(50))
    nickname = db.Column(db.String(50))
    password = db.Column(db.String(50))
    mail = db.Column(db.String(50))

    avatars = db.relationship('Avatar', back_populates='child', lazy='dynamic', cascade="all, delete-orphan")

    def __init__(self, login, nickname, password, mail):
        self.login = login
        self.nickname = nickname
        self.password = password
        self.mail = mail

    def __repr__(self):
        return '<Child %r>' % self.login


class Avatar(BaseModel):
    name = db.Column(db.String(50))
    level = db.Column(db.Integer)
    money = db.Column(db.Integer)
    health = db.Column(db.Integer)
    experience = db.Column(db.Integer)

    #items
    #tasks
    #tutor


    child_id = db.Column(db.Integer, db.ForeignKey('child.id'))
    child = db.relationship('Child', back_populates='avatars', lazy='joined')

    def __init__(self, name, child, level, money, health, experience):
        self.name = name
        self.child = child
        self.level = level
        self.money = money
        self.health = health
        self.experience = experience

    def __repr__(self):
        return '<Avatar %r>' % self.name
