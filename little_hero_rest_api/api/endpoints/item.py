import logging

from flask import request
from little_hero_rest_api.api.restplus import api
from flask_restplus import Resource
from little_hero_rest_api.api.serializers import item_for_post
from little_hero_rest_api.api.serializers import item_full
from little_hero_rest_api.api.serializers import item_for_patch
from little_hero_rest_api.dao.item import ItemDAO
from little_hero_rest_api.security.hmac_auth import HMACAuth
from little_hero_rest_api.api.restplus import authorizations_header_desc


log = logging.getLogger(__name__)

ns = api.namespace('v1/items', description='Operations related to items')
hmac_auth = HMACAuth()
DAO = ItemDAO()


@ns.route('/')
@ns.response(400, 'Bad request')
@ns.response(401, 'Unauthorized')
class ItemsCollection(Resource):
    """Show a list of all items and lets you POST to add new item."""

    @hmac_auth.protected
    @api.header('Authorization', authorizations_header_desc)
    @ns.param('avatar_id', 'For filtering by avatar id', 'query')
    @ns.param('state', 'For filtering by item state', 'query')
    @api.marshal_list_with(item_full)
    def get(self):
        """Returns list of items."""
        avatar_id = request.args.get('avatar_id')
        state = request.args.get('state')
        items = DAO.get_all(avatar_id, state) #todo: remove filtering?
        return items

    @hmac_auth.protected
    @api.header('Authorization', authorizations_header_desc)
    @api.response(201, 'Item created.')
    @api.expect(item_for_post)
    @ns.marshal_with(item_full)
    def post(self):
        """Create item"""
        data = request.json
        return DAO.create(data), 201

    @hmac_auth.protected
    @api.header('Authorization', authorizations_header_desc)
    @api.response(204, 'No content')
    @api.expect([item_for_post])
    def put(self):
        """Bulk update items"""
        data = request.json
        DAO.bulk_update(data)
        return None, 204


@ns.route('/<int:id>')
@ns.response(401, 'Unauthorized')
@ns.response(404, 'Item not found')
@ns.response(400, 'Bad request')
@ns.param('id', 'The item identifier')
class Item(Resource):
    """Show a single item entity and lets you delete and update it"""

    @hmac_auth.protected
    @api.header('Authorization', authorizations_header_desc)
    @ns.marshal_with(item_full)
    def get(self, id):
        """Returns item"""
        item = DAO.get(id)
        return item

    @hmac_auth.protected
    @api.header('Authorization', authorizations_header_desc)
    @ns.response(204, 'item deleted')
    def delete(self, id):
        """Delete a item given its identifier"""
        DAO.delete(id)
        return None, 204

    @hmac_auth.protected
    @api.header('Authorization', authorizations_header_desc)
    @ns.response(200, 'item updated')
    @api.expect(item_for_patch)
    @ns.marshal_with(item_full)
    def patch(self, id):
        """Update item given only its parameters that should be updated"""
        data = request.json

        return DAO.update(id, data), 200
