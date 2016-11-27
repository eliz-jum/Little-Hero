# reference
# http://flask-sqlalchemy.pocoo.org/2.1/quickstart/#simple-relationships
from enum import Enum
from datetime import datetime
from little_hero_rest_api.database import db


class BaseModel(db.Model):
    __abstract__ = True #sqlAlchemy will not create table for this model
    id = db.Column(db.Integer, primary_key=True)
    creationDate = db.Column(db.DateTime)
    # created = db.Column()


class Child(BaseModel):
    login = db.Column(db.String(50), unique=True)
    nickname = db.Column(db.String(50))
    password = db.Column(db.String(50))
    mail = db.Column(db.String(50))

    avatars = db.relationship('Avatar', back_populates='child', lazy='dynamic', cascade="all, delete-orphan")

    def __init__(self, login, nickname, password, mail):
        self.login = login
        self.nickname = nickname
        self.password = password
        self.mail = mail
        self.creationDate = datetime.utcnow()

    def __repr__(self):
        return '<Child %r>' % self.login


class Avatar(BaseModel):
    name = db.Column(db.String(50))
    level = db.Column(db.Integer)
    money = db.Column(db.Integer)
    health = db.Column(db.Integer)
    experience = db.Column(db.Integer)

    #tasks

    child_id = db.Column(db.Integer, db.ForeignKey('child.id'))
    child = db.relationship('Child', back_populates='avatars', lazy='joined')

    tutor_id = db.Column(db.Integer, db.ForeignKey('tutor.id'))
    tutor = db.relationship('Tutor', back_populates='avatars', lazy='joined')

    avatar_items = db.relationship('AvatarItem', lazy='dynamic')

    def __init__(self, name, child, tutor, level, money, health, experience):
        self.name = name
        self.child = child
        self.tutor = tutor
        self.level = level
        self.money = money
        self.health = health
        self.experience = experience

    def __repr__(self):
        return '<Avatar %r>' % self.name


class Tutor(BaseModel):
    login = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(50))
    mail = db.Column(db.String(50))

    avatars = db.relationship('Avatar', back_populates='tutor', lazy='dynamic')

    def __init__(self, login, password, mail):
        self.login = login
        self.password = password
        self.mail = mail

    def __repr__(self):
        return '<Tutor %r>' % self.login


class Item(BaseModel):
    name = db.Column(db.String(50), unique=True)
    price = db.Column(db.Integer)
    level = db.Column(db.Integer)
    clazz = db.Column(db.String(50))
    type = db.Column(db.String(50))

    def __init__(self, name, price, level, clazz, type):
        self.name = name
        self.price = price
        self.level = level
        self.clazz = clazz
        self.type = type

    def __repr__(self):
        return '<Item %r>' % self.item


class Task(BaseModel):
    content = db.Column(db.String(1000))
    difficulty = db.Column(db.Integer)
    experience = db.Column(db.Integer)
    is_completed = db.Column(db.Boolean)
    is_archived = db.Column(db.Boolean)
    reward = db.Column(db.Integer)

    def __init__(self, content, difficulty, experience, completed, archived, reward):
        self.content = content
        self.difficulty = difficulty
        self.experience = experience
        self.completed = completed
        self.archived = archived
        self.reward = reward

    def __repr__(self):
        return '<Task id: %r>' % self.id


class AvatarItem(db.Model):

    avatar_id = db.Column('avatar_id', db.Integer, db.ForeignKey('avatar.id'), primary_key=True)
    #avatar = db.relationship('Avatar', back_populates='item_avatars', lazy='dynamic')
    item_id = db.Column('item_id', db.Integer, db.ForeignKey('item.id'), primary_key=True)
    state = db.Column(db.String(50), primary_key=True)
    updateDate = db.Column(db.DateTime)

    def __init__(self, avatar_id, item_id, state):
        self.avatar_id = avatar_id
        self.item_id = item_id
        self.state = state

    def __repr__(self):
        return '<AvatarItem  avatar_id: {0!r}, item_id: {0!r}, state: {0!r}>'\
            .format(self.avatar_id,  self.item_id, self.state)

    class ItemState(Enum):
        on = 1
        bought = 2
        available = 3
        unavailable = 4
# avatarAvailableItems = db.Table('avatarAvailableItems',
#     db.Column('avatar_id', db.Integer, db.ForeignKey('avatar.id')),
#     db.Column('item_id', db.Integer, db.ForeignKey('item.id'))
# )
#
# avatarPutOnItems = db.Table('avatarPutOnItems',
#     db.Column('avatar_id', db.Integer, db.ForeignKey('avatar.id')),
#     db.Column('item_id', db.Integer, db.ForeignKey('item.id'))
# )
#
# avatarCanBePurchasedItems = db.Table('avatarCanBePurchasedItems',
#     db.Column('avatar_id', db.Integer, db.ForeignKey('avatar.id')),
#     db.Column('item_id', db.Integer, db.ForeignKey('item.id'))
# )