from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import Notification
from little_hero_rest_api.dao.generic import GenericDAO


class NotificationDAO(GenericDAO):

    def __init__(self):
        super().__init__(Notification)

    def create(self, avatar_id, data):
        content = data.get('content')
        notification = Notification(avatar_id, content)
        db.session.add(notification)
        db.session.commit()

        return notification

    def update(self, notification_id, data):
        query = Notification.query.filter_by(id=notification_id)
        query.update(data)
        notification = query.one()
        db.session.commit()
        return notification

    def get_all(self, avatar_id):
        avatar_notifications = Notification.query.filter_by(avatar_id=avatar_id).all()
        return avatar_notifications
