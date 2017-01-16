import logging

from flask import request
from little_hero_rest_api.api.restplus import api
from little_hero_rest_api.dao.avatar_item import AvatarItemDAO
from little_hero_rest_api.api.serializers import avatar_item_full
from little_hero_rest_api.api.serializers import avatar_item_for_post
from little_hero_rest_api.api.serializers import avatar_item_for_patch
from flask_restplus import Resource
from little_hero_rest_api.security.hmac_auth import HMACAuth
from little_hero_rest_api.api.restplus import authorizations_header_desc

log = logging.getLogger(__name__)

ns = api.namespace('v1/avatar-item-links', description='Operations related to avatar item links')

hmac_auth = HMACAuth()
DAO = AvatarItemDAO()


@ns.route('/')
@ns.response(400, 'Bad request')
class AvatarItemCollection(Resource):
    """Show a list of avatar-item links and lets you POST to add new."""

    @hmac_auth.protected
    @api.header('Authorization', authorizations_header_desc)
    @api.marshal_list_with(avatar_item_full)
    @ns.param('avatar_id', 'For filtering by avatar id', 'query')
    @ns.param('item_id', 'For filtering by item id', 'query')
    @ns.param('state', 'For filtering by item state', 'query')
    def get(self):
        """Returns list of avatar-item links or filtered list of links given avatar id or item id."""
        avatar_id = request.args.get('avatar_id')
        item_id = request.args.get('item_id')
        state = request.args.get('state')
        avatars = DAO.get_all(avatar_id, item_id, state)
        # wornItems, canBePutOnItems, canBePurchasedItems, unavailableItems
        return avatars

    @hmac_auth.protected
    @api.header('Authorization', authorizations_header_desc)
    @api.response(201, 'Avatar-Item link created.')
    @api.expect(avatar_item_for_post)
    @ns.marshal_with(avatar_item_full)
    def post(self):
        """Create avatar"""
        data = request.json
        return DAO.create(data), 201


@ns.route('/<int:id>')
@ns.response(401, 'Unauthorized')
@ns.response(404, 'Avatar-Item link not found')
@ns.response(400, 'Bad request')
@ns.param('id', 'The avatar identifier')
class AvatarItem(Resource):
    """Show a single avatar-item entity and lets you delete and update it"""

    @hmac_auth.protected
    @api.header('Authorization', authorizations_header_desc)
    @ns.marshal_with(avatar_item_full)
    def get(self, id):
        """Returns avatar-item entity"""
        avatar = DAO.get(id)
        return avatar

    @hmac_auth.protected
    @api.header('Authorization', authorizations_header_desc)
    @ns.response(204, 'Avatar-Item deleted')
    def delete(self, id):
        """Delete a avatar-item entity given its identifier"""
        DAO.delete(id)
        return None, 204

    @hmac_auth.protected
    @api.header('Authorization', authorizations_header_desc)
    @ns.response(200, 'Avatar-Item updated')
    @api.expect(avatar_item_for_patch)
    @ns.marshal_with(avatar_item_full)
    def patch(self, id):
        """Update avatar_item entity given only its parameters that should be updated"""
        data = request.json
        return DAO.update(id, data), 200