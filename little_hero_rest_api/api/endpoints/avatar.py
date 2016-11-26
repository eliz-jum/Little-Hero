import logging

from flask import request
from little_hero_rest_api.api.restplus import api
from flask_restplus import Resource
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
        avatars = DAO.get_all()
        return avatars

    @api.response(201, 'Child created.')
    @api.expect(avatar)
    def post(self):
        """Create avatar"""
        data = request.json
        DAO.create(data)
        return None, 201

@ns.route('/<int:id>')
@ns.response(404, 'Avatar not found')
@ns.param('id', 'The avatar identifier')
class Child(Resource):
    """Show a single avatar entity and lets you delete and update it"""
    @ns.marshal_with(avatar)
    def get(self, id):
        """Returns avatar"""
        avatar = DAO.get(id)
        return avatar

    @ns.response(204, 'Child deleted')
    def delete(self, id):
        """Delete a avatar given its identifier"""
        DAO.delete(id)
        return None, 204
