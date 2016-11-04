import logging

from flask import request
from app.api.restplus import api
from flask_restplus import Resource
from app.database.models import Child
from app.api.serializers import child
from app.dao.children_dao import create_child

log = logging.getLogger(__name__)

ns = api.namespace('children', description='Operations related to children')


@ns.route('/')
class ChildrenCollection(Resource):

    def get(self):
        """Returns list of children."""
        children = Child.query.all()
        return children
    @api.response(201, 'Child created.')
    @api.expect(child)
    def post(self):
        """Create child"""
        data = request.json
        create_child(data)
        return None, 201
