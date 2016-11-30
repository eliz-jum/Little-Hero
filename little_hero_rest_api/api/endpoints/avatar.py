import logging

from flask import request
from little_hero_rest_api.api.restplus import api
from flask_restplus import Resource
from little_hero_rest_api.api.serializers import avatar
from little_hero_rest_api.api.serializers import avatar_for_patch
from little_hero_rest_api.dao.avatar import AvatarDAO


log = logging.getLogger(__name__)

ns = api.namespace('v1/avatars', description='Operations related to avatars')

DAO = AvatarDAO()


@ns.route('/')
class AvatarsCollection(Resource):
    """Show a list of avatars and lets you POST to add new avatar."""
    @api.marshal_list_with(avatar)
    @ns.param('child_id', 'For filtering by child id', 'query')
    @ns.param('tutor_id', 'For filtering by tutor id', 'query')
    def get(self):
        """Returns list of avatars or filtered list of avatars given child id or tutor id."""
        child_id = request.args.get('child_id')
        tutor_id = request.args.get('tutor_id')
        avatars = DAO.get_all(child_id, tutor_id)
        return avatars

    @api.response(201, 'Avatar created.')
    @api.expect(avatar)
    @ns.marshal_with(avatar)
    def post(self):
        """Create avatar"""
        data = request.json
        return DAO.create(data), 201


@ns.route('/<int:id>')
@ns.response(404, 'Avatar not found')
@ns.param('id', 'The avatar identifier')
class Avatar(Resource):
    """Show a single avatar entity and lets you delete and update it"""
    @ns.marshal_with(avatar)
    def get(self, id):
        """Returns avatar"""
        avatar = DAO.get(id)
        return avatar

    @ns.response(204, 'Avatar deleted')
    def delete(self, id):
        """Delete a avatar given its identifier"""
        DAO.delete(id)
        return None, 204

    @ns.response(204, 'Avatar updated')
    @api.expect(avatar_for_patch)
    def patch(self, id):
        """Update Avatar given only its parameters that should be updated"""
        data = request.json
        DAO.update(id, data)
        return None, 204
