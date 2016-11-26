import logging

from flask import request
from little_hero_rest_api.api.restplus import api
from flask_restplus import Resource
from little_hero_rest_api.database.models import Avatar
from little_hero_rest_api.api.serializers import avatar
from little_hero_rest_api.dao.avatar import AvatarDAO


log = logging.getLogger(__name__)

ns = api.namespace('avatars', description='Operations related to avatars')

DAO = AvatarDAO()

@ns.route('/')
class AvatarsCollection(Resource):

    @api.marshal_list_with(avatar)
    def get(self):
        """Returns list of avatars."""
        avatar = AvatarDAO.query.all()
        return avatar

    @api.response(201, 'Child created.')
    @api.expect(avatar)
    def post(self):
        """Create avatar"""
        data = request.json
        AvatarDAO.create_avatar(data)
        return None, 201