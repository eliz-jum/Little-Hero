# reference
# http://flask-sqlalchemy.pocoo.org/2.1/quickstart/#simple-relationships
from datetime import datetime
from little_hero_rest_api.database import db
from passlib.hash import pbkdf2_sha512
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired
from little_hero_rest_api import settings


class BaseModel(db.Model):
    __abstract__ = True  # sqlAlchemy will not create table for this model
    id = db.Column(db.Integer, primary_key=True)
    creation_date = db.Column(db.DateTime)  # todo: add creation date


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
    name = db.Column(db.String(50), unique=True)

    clazz = db.Column(db.String(50))
    update_task = db.Column(db.Boolean)
    update_invitation = db.Column(db.Boolean)
    update_notification = db.Column(db.Boolean)

    level = db.Column(db.Integer)
    money = db.Column(db.Integer)
    health = db.Column(db.Integer)
    experience = db.Column(db.Integer)
    child_id = db.Column(db.Integer, db.ForeignKey('child.id'))
    child = db.relationship('Child', back_populates='avatars', lazy='joined')

    tutor_id = db.Column(db.Integer, db.ForeignKey('tutor.id'))
    tutor = db.relationship('Tutor', back_populates='avatars', lazy='joined')

    tasks = db.relationship('Task', back_populates='avatar', lazy='dynamic')

    # avatar_items = db.relationship('AvatarItem', lazy='dynamic')

    def __init__(self, name, clazz, child, tutor, level, money, health, experience):
        self.name = name
        self.clazz = clazz
        self.update_notification = False
        self.update_task = False
        self.update_invitation = False
        self.child = child
        self.tutor = tutor
        self.level = level
        self.money = money
        self.health = health
        self.experience = experience
        self.creationDate = datetime.utcnow()

    def __repr__(self):
        return '<Avatar %r>' % self.name


class Tutor(BaseModel):
    login = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(50))
    mail = db.Column(db.String(50))

    avatars = db.relationship('Avatar', back_populates='tutor', lazy='dynamic')
    tasks = db.relationship('Task', back_populates='tutor', lazy='dynamic')

    def __init__(self, login, password, mail):
        self.login = login
        self.password = password
        self.mail = mail
        self.creationDate = datetime.utcnow()

    def __repr__(self):
        return '<Tutor %r>' % self.login


class Item(BaseModel):
    # name = db.Column(db.String(50), unique=True)
    price = db.Column(db.Integer)
    level = db.Column(db.Integer)
    clazz = db.Column(db.String(50))
    type = db.Column(db.String(50))
    imgSrc = db.Column(db.String(50))
    iconSrc = db.Column(db.String(50))

    # itemOfAvatars = db.relationship('AvatarItem', back_populates='item', lazy='dynamic')

    def __init__(self, price, level, clazz, type, imgSrc, iconSrc):
        self.price = price
        self.level = level
        self.clazz = clazz
        self.type = type
        self.imgSrc = imgSrc
        self.iconSrc = iconSrc
        self.creationDate = datetime.utcnow()

    def __repr__(self):
        return '<Item %r>' % self.id


class Task(BaseModel):
    content = db.Column(db.String(1000))
    difficulty = db.Column(db.Integer)
    experience = db.Column(db.Integer)
    reward = db.Column(db.Integer)

    avatar_id = db.Column(db.Integer, db.ForeignKey('avatar.id'))
    avatar = db.relationship('Avatar', back_populates='tasks', lazy='joined')

    tutor_id = db.Column(db.Integer, db.ForeignKey('tutor.id'))
    tutor = db.relationship('Tutor', back_populates='tasks', lazy='joined')

    def __init__(self, content, avatar, tutor, difficulty, experience, reward):
        self.content = content
        self.avatar = avatar
        self.tutor = tutor
        self.difficulty = difficulty
        self.experience = experience
        self.reward = reward
        self.creationDate = datetime.utcnow()

    def __repr__(self):
        return '<Task id: %r>' % self.id


class Invitation(BaseModel):
    kind = db.Column(db.String(50))
    status = db.Column(db.String(50))
    child_id = db.Column('child_id', db.Integer, db.ForeignKey('child.id'), nullable=False)
    tutor_id = db.Column('tutor_id', db.Integer, db.ForeignKey('tutor.id'), nullable=False)
    db.UniqueConstraint(child_id, tutor_id)

    def __init__(self, kind, status, child_id, tutor_id):
        self.kind = kind
        self.status = status
        self.child_id = child_id
        self.tutor_id = tutor_id

    def __repr__(self):
        return '<Invitation id: %r>' % self.id


class AvatarItem(BaseModel):
    avatar_id = db.Column('avatar_id', db.Integer, db.ForeignKey('avatar.id'), nullable=False)
    # avatar = db.relationship('Avatar', back_populates='item_avatars', lazy='dynamic')
    item_id = db.Column('item_id', db.Integer, db.ForeignKey('item.id'), nullable=False)
    # item = db.relationship('Item', back_populates='', lazy='dynamic')
    state = db.Column(db.String(50))
    db.UniqueConstraint('avatar_id', 'item_id')

    # updateDate = db.Column(db.DateTime)

    def __init__(self, avatar_id, item_id, state):
        self.avatar_id = avatar_id
        self.item_id = item_id
        self.state = state
        self.creationDate = datetime.utcnow()

    def __repr__(self):
        return '<AvatarItem  avatar_id: {0!r}, item_id: {0!r}, state: {0!r}>' \
            .format(self.avatar_id, self.item_id, self.state)


class Notification(BaseModel):
    avatar_id = db.Column('avatar_id', db.Integer, db.ForeignKey('avatar.id'), nullable=False)
    content = db.Column(db.String(200))

    def __init__(self, avatar_id, content):
        self.avatar_id = avatar_id
        self.content = content

    def __repr__(self):
        return '<Notification id: %r>' % self.id


        # class ItemState(Enum):
        #     on = 1
        #     bought = 2
        #     available = 3
        #     unavailable = 4

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
