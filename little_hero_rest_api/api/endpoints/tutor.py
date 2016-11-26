import logging

from flask import request
from little_hero_rest_api.api.restplus import api
from flask_restplus import Resource
from little_hero_rest_api.api.serializers import tutor
from little_hero_rest_api.dao.tutor import TutorDAO

log = logging.getLogger(__name__)

ns = api.namespace('tutors', description='Operations related to tutors')
DAO = TutorDAO()


@ns.route('/')
class TutorsCollection(Resource):
    """Show a list of all tutors and lets you POST to add new tutor."""

    @api.marshal_list_with(tutor)
    def get(self):
        """Returns list of tutors."""
        tutors = DAO.get_all()
        return tutors

    @api.response(201, 'Tutor created.')
    @api.expect(tutor)
    def post(self):
        """Create tutor"""
        data = request.json
        DAO.create(data)
        return None, 201


@ns.route('/<int:id>')
@ns.response(404, 'Tutor not found')
@ns.param('id', 'The tutor identifier')
class Child(Resource):
    """Show a single tutor entity and lets you delete and update it"""
    @ns.marshal_with(tutor)
    def get(self, id):
        """Returns tutor"""
        tutor = DAO.get(id)
        return tutor

    @ns.response(204, 'Tutor deleted')
    def delete(self, id):
        """Delete a tutor given its identifier"""
        DAO.delete(id)
        return None, 204
