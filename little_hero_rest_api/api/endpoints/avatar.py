import logging

from flask import request
from little_hero_rest_api.api.restplus import api
from flask_restplus import Resource
from little_hero_rest_api.database.models import Avatar
from little_hero_rest_api.api.serializers import avatar
from little_hero_rest_api.business.avatar import create_avatar


log = logging.getLogger(__name__)

ns = api.namespace('avatars', description='Operations related to avatars')

@ns.route('/')
class AvatarsCollection(Resource):

    @api.marshal_list_with(avatar)
    def get(self):
        """Returns list of avatars."""
        avatar = Avatar.query.all()
        return avatar
    @api.response(201, 'Child created.')
    @api.expect(avatar)
    def post(self):
        """Create avatar"""
        data = request.json
        create_avatar(data)
        return None, 201