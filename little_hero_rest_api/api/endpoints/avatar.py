import logging

from flask import request
from little_hero_rest_api.api.restplus import api
from flask_restplus import Resource
from little_hero_rest_api.api.serializers import avatar_for_post
from little_hero_rest_api.api.serializers import avatar_full
from little_hero_rest_api.api.serializers import avatar_for_patch
from little_hero_rest_api.api.serializers import notification_full
from little_hero_rest_api.api.serializers import notification_for_post
from little_hero_rest_api.api.serializers import notification_for_patch
from little_hero_rest_api.dao.avatar import AvatarDAO
from little_hero_rest_api.dao.notification import NotificationDAO


log = logging.getLogger(__name__)

ns = api.namespace('v1/avatars', description='Operations related to avatars')

avatar_dao = AvatarDAO()
notification_dao = NotificationDAO()


@ns.route('/')
class AvatarsCollection(Resource):
    """Show a list of avatars and lets you POST to add new avatar."""
    @api.marshal_list_with(avatar_full)
    @ns.param('child_id', 'For filtering by child id', 'query')
    @ns.param('tutor_id', 'For filtering by tutor id', 'query')
    def get(self):
        """Returns list of avatars or filtered list of avatars given child id or tutor id."""
        child_id = request.args.get('child_id')
        tutor_id = request.args.get('tutor_id')
        avatars = avatar_dao.get_all(child_id, tutor_id)
        return avatars

    @api.response(201, 'Avatar created.')
    @api.expect(avatar_for_post)
    @ns.marshal_with(avatar_full)
    def post(self):
        """Create avatar"""
        data = request.json
        return avatar_dao.create(data), 201


@ns.route('/<int:id>')
@ns.response(404, 'Avatar not found')
@ns.param('avatar_id', 'The avatar identifier')
class Avatar(Resource):
    """Show a single avatar entity and lets you delete and update it"""
    @ns.marshal_with(avatar_full)
    def get(self, id):
        """Returns avatar"""
        avatar = avatar_dao.get(id)
        return avatar

    @ns.response(204, 'Avatar deleted')
    def delete(self, id):
        """Delete a avatar given its identifier"""
        avatar_dao.delete(id)
        return None, 204

    @ns.response(200, 'Avatar updated')
    @api.expect(avatar_for_patch)
    @ns.marshal_with(avatar_full)
    def patch(self, id):
        """Update Avatar given only its parameters that should be updated"""
        data = request.json
        return avatar_dao.update(id, data), 200


@ns.route('/<int:avatar_id>/notifications')
@ns.response(404, 'Avatar not found')
@ns.param('avatar_id', 'The avatar identifier')
class AvatarNotificationsCollection(Resource):
    """Show a list of all avatar notifications and lets you POST to add new notification."""
    @api.marshal_list_with(notification_full)
    def get(self, avatar_id):
        """Returns list of notifications."""
        notifications = notification_dao.get_all(avatar_id)
        return notifications

    @api.response(201, 'Notification created.')
    @api.expect(notification_for_post)
    @ns.marshal_with(notification_full)
    def post(self, avatar_id):
        """Create notifications"""
        data = request.json
        return notification_dao.create(avatar_id, data), 201


@ns.route('/<int:avatar_id>/notifications/<int:notification_id>')
@ns.response(404, 'Avatar or notification not found')
@ns.param('avatar_id', 'The avatar identifier')
@ns.param('notification_id', 'The notification identifier')
class AvatarNotification(Resource):
    """Show a single notification entity and lets you delete and update it"""
    @api.marshal_with(notification_full)
    def get(self, avatar_id, notification_id):
        """Return notification"""
        return notification_dao.get(notification_id)

    @ns.response(204, 'Notification deleted')
    def delete(self, avatar_id, notification_id):
        """Delete an notification given its identifier"""
        notification_dao.delete(notification_id)
        return None, 204

    @ns.response(200, 'Notification updated')
    @api.expect(notification_for_patch)
    @ns.marshal_with(notification_full)
    def patch(self, avatar_id, notification_id):
        """Update status of notification"""
        data = request.json
        updated_notification = notification_dao.update(notification_id, data)
        return updated_notification, 200
