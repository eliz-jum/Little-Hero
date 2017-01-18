from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import Avatar
from little_hero_rest_api.database.models import Item
from little_hero_rest_api.database.models import AvatarItem
from little_hero_rest_api.dao.child import ChildDAO
from little_hero_rest_api.dao.tutor import TutorDAO
from little_hero_rest_api.dao.generic import GenericDAO
from little_hero_rest_api.dto.generic_dto import GenericDTO


class AvatarDAO(GenericDAO):

    child_dao = ChildDAO()
    tutor_dao = TutorDAO()

    def __init__(self):
        super().__init__(Avatar)

    def get_all(self, child_id, tutor_id):
        if child_id and tutor_id:
            return Avatar.query.filter_by(child_id=child_id, tutor_id=tutor_id).all()
        if child_id:
            avatars = Avatar.query.filter_by(child_id=child_id).all()
            return avatars
        if tutor_id:
            return Avatar.query.filter_by(tutor_id=tutor_id).all()
        return super().get_all()

    def create(self, data):
        name = data.get('name')
        clazz = data.get('clazz')
        child_id = data.get('child_id')
        child = self.child_dao.get(child_id)
        tutor_id = data.get('tutor_id')
        tutor = None
        if tutor_id:
            tutor = self.tutor_dao.get(tutor_id)
        level = data.get('level')
        money = data.get('money')
        health = data.get('health')
        experience = data.get('experience')

        avatar = Avatar(name, clazz, child, tutor, level, money, health, experience)

        db.session.add(avatar)
        db.session.commit()
        return avatar

    def update(self, id, data):
        name = data.get('name')

        clazz = data.get('clazz')
        update_task = data.get('update_task')
        update_invitation = data.get('update_invitation')
        update_notification = data.get('update_notification')
        child_id = data.get('child_id')
        tutor_id = data.get('tutor_id')
        level = data.get('level')
        money = data.get('money')
        health = data.get('health')
        experience = data.get('experience')

        avatar = Avatar.query.filter_by(id=id).one()

        if clazz:
            avatar.clazz = clazz
        if isinstance(update_task, bool):
            avatar.update_task = update_task
        if isinstance(update_invitation, bool):
            avatar.update_invitation = update_invitation
        if isinstance(update_notification, bool):
            avatar.update_notification = update_notification

        if name:
            avatar.name = name

        if isinstance(child_id, int):
            child = self.child_dao.get(child_id)
            avatar.child = child
        if isinstance(tutor_id, int):
            tutor = self.tutor_dao.get(tutor_id)
            avatar.tutor = tutor
        if isinstance(level, int):
            avatar.level = level
        if isinstance(money, int):
            avatar.money = money
        if isinstance(health, int):
            avatar.health = health
        if isinstance(experience, int):
            avatar.experience = experience

        db.session.commit()

        return avatar

    def get_all_items(self, avatar_id, state):
        query = db.session.query(Item, AvatarItem) \
            .filter(AvatarItem.item_id == Item.id)
        if avatar_id:
            query = query.filter(AvatarItem.avatar_id == avatar_id)
        if state:
            query = query.filter(AvatarItem.state == state)
        result = query.all()

        item_set = set()
        for (item, avatar_item) in result:
            item = GenericDTO(
                id=item.id,
                price=item.price,
                level=item.level,
                clazz=item.clazz,
                type=item.type,
                imgSrc=item.imgSrc,
                iconSrc=item.iconSrc,
                state=avatar_item.state,
                avatar_item_id=avatar_item.id
            )
            item_set.add(item)
        return list(item_set)
