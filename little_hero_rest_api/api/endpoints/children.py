import logging

from flask import request
from little_hero_rest_api.api.restplus import api
from flask_restplus import Resource
from little_hero_rest_api.api.serializers import child
from little_hero_rest_api.api.serializers import child_for_patch
from little_hero_rest_api.dao.children import ChildDAO

log = logging.getLogger(__name__)

ns = api.namespace('children', description='Operations related to children')
DAO = ChildDAO()


@ns.route('/')
class ChildrenCollection(Resource):
    """Show a list of all children and lets you POST to add new child."""
    @api.marshal_list_with(child)
    def get(self):
        """Returns list of children."""
        children = DAO.get_all()
        return children

    @api.response(201, 'Child created.')
    @api.expect(child)
    def post(self):
        """Create child"""
        data = request.json
        DAO.create(data)
        return None, 201


@ns.route('/<int:id>')
@ns.response(404, 'Child not found')
@ns.param('id', 'The child identifier')
class Child(Resource):
    """Show a single child entity and lets you delete and update it"""
    @ns.marshal_with(child)
    def get(self, id):
        """Returns child"""
        child = DAO.get(id)
        return child

    @ns.response(204, 'Child deleted')
    def delete(self, id):
        """Delete a child given its identifier"""
        DAO.delete(id)
        return None, 204

    @ns.response(204, 'Child updated')
    @api.expect(child_for_patch)
    def patch(self, id):
        """Update child given only its parameters that should be updated"""
        data = request.json
        DAO.update(id, data)
        return None, 204
