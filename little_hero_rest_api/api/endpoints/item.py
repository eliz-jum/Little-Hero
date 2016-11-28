import logging

from flask import request
from little_hero_rest_api.api.restplus import api
from flask_restplus import Resource
from little_hero_rest_api.api.serializers import item
from little_hero_rest_api.api.serializers import item_for_patch
from little_hero_rest_api.dao.item import ItemDAO

log = logging.getLogger(__name__)

ns = api.namespace('v1/items', description='Operations related to items')
DAO = ItemDAO()


@ns.route('/')
class ItemsCollection(Resource):
    """Show a list of all items and lets you POST to add new item."""

    @api.marshal_list_with(item)
    def get(self):
        """Returns list of items."""
        items = DAO.get_all()
        return items

    @api.response(201, 'item created.')
    @api.expect(item)
    def post(self):
        """Create item"""
        data = request.json
        DAO.create(data)
        return None, 201


@ns.route('/<int:id>')
@ns.response(404, 'item not found')
@ns.param('id', 'The item identifier')
class Item(Resource):
    """Show a single item entity and lets you delete and update it"""
    @ns.marshal_with(item)
    def get(self, id):
        """Returns item"""
        item = DAO.get(id)
        return item

    @ns.response(204, 'item deleted')
    def delete(self, id):
        """Delete a item given its identifier"""
        DAO.delete(id)
        return None, 204

    @ns.response(204, 'item updated')
    @api.expect(item_for_patch)
    def patch(self, id):
        """Update item given only its parameters that should be updated"""
        data = request.json
        DAO.update(id, data)
        return None, 204
