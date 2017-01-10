import logging

from flask import request, jsonify, g
from little_hero_rest_api.api.restplus import api
from flask_restplus import Resource
from little_hero_rest_api.database.models import Tutor as TutorModel
from little_hero_rest_api.api.serializers import tutor_for_post
from little_hero_rest_api.api.serializers import tutor_full
from little_hero_rest_api.api.serializers import tutor_for_patch
from little_hero_rest_api.api.serializers import child_full
from little_hero_rest_api.api.serializers import invitation_full
from little_hero_rest_api.api.serializers import invitation_for_patch
from little_hero_rest_api.api.serializers import tutor_invitation_for_post
from little_hero_rest_api.dao.tutor import TutorDAO
from little_hero_rest_api.dao.invitation import InvitationDAO

from flask_httpauth import HTTPBasicAuth

auth = HTTPBasicAuth()

log = logging.getLogger(__name__)

ns = api.namespace('v1/tutors', description='Operations related to tutors')
tutor_dao = TutorDAO()
invitation_dao = InvitationDAO()

@ns.route('/')
@ns.response(400, 'Bad request')
class TutorsCollection(Resource):
    """Show a list of all tutors and lets you POST to add new tutor."""

    @api.marshal_list_with(tutor_full)
    def get(self):
        """Returns list of tutors."""
        tutors = tutor_dao.get_all()
        return tutors

    @api.response(201, 'Tutor created.')
    @api.expect(tutor_for_post)
    @ns.marshal_with(tutor_full)
    def post(self):
        """Create tutor"""
        data = request.json
        return tutor_dao.create(data), 201


@ns.route('/<int:id>')
@ns.response(404, 'Tutor not found')
@ns.response(400, 'Bad request')
@ns.param('id', 'The tutor identifier')
class Tutor(Resource):
    """Show a single tutor entity and lets you delete and update it"""
    @ns.marshal_with(tutor_full)
    def get(self, id):
        """Returns tutor"""
        tutor = tutor_dao.get(id)
        return tutor

    @ns.response(204, 'Tutor deleted')
    def delete(self, id):
        """Delete a tutor given its identifier"""
        tutor_dao.delete(id)
        return None, 204

    @ns.response(201, 'Tutor updated')
    @api.expect(tutor_for_patch)
    @ns.marshal_with(tutor_full)
    def patch(self, id):
        """Update tutor given only its parameters that should be updated"""
        data = request.json
        return tutor_dao.update(id, data), 201


@ns.route('/<int:id>/children')
@ns.response(404, 'Tutor not found')
@ns.response(400, 'Bad request')
@ns.param('id', 'The tutor identifier')
class TutorChildren(Resource):
    """Returns list of tutor children"""
    @ns.marshal_list_with(child_full)
    def get(self, id):
        return tutor_dao.get_all_children(id)


@ns.route('/<int:id>/invitations')
@ns.response(404, 'Tutor not found')
@ns.response(400, 'Bad request')
@ns.param('id', 'The tutor identifier')
class TutorInvitationsCollection(Resource):
    """Show a list of all tutor invitations and lets you POST to add new invitation."""
    @api.marshal_list_with(invitation_full)
    @ns.param('kind', 'For filtering by type of invitation', 'query')
    @ns.param('status', 'For filtering by status of invitation', 'query')
    def get(self, id):
        """Returns list of invitations."""
        #tutor_id = request.args.get('tutor_id')
        kind = request.args.get('kind')
        status = request.args.get('status')
        invitations = invitation_dao.get_all(None, id, kind, status)
        return invitations

    @api.response(201, 'Invitation created.')
    @api.expect(tutor_invitation_for_post)
    @ns.marshal_with(invitation_full)
    def post(self, id):
        """Create invitations"""
        data = request.json
        return invitation_dao.create(data, id), 201


@ns.route('/<int:tutor_id>/invitations/<int:invitation_id>')
@ns.response(404, 'Tutor not found')
@ns.response(400, 'Bad request')
@ns.param('tutor_id', 'The tutor identifier')
@ns.param('invitation_id', 'The invitation identifier')
class TutorInvitation(Resource):
    """Show a single invitation entity and lets you delete and update it"""
    @api.marshal_with(invitation_full)
    def get(self, tutor_id, invitation_id):
        """Return invitation"""
        #tutor_id = request.args.get('tutor_id')
        #invitation_id = request.args.get('invitation_id')
        return invitation_dao.get(invitation_id)

    @ns.response(204, 'Invitation deleted')
    def delete(self, tutor_id, invitation_id):
        """Delete an invitation given its identifier"""
        invitation_dao.delete(invitation_id)
        return None, 204

    @ns.response(200, 'Invitation updated')
    @api.expect(invitation_for_patch)
    @ns.marshal_with(invitation_full)
    def patch(self, tutor_id, invitation_id):
        """Update status of invitation"""
        data = request.json
        updated_invitation = invitation_dao.update(invitation_id, data)
        return updated_invitation, 200


@auth.verify_password
def verify_password(login_or_token, password):
    child = TutorModel.verify_auth_token(login_or_token)
    if not child:
        child = tutor_dao.get_tutor_by_login(login_or_token)
        password_hash = child.password
        if not child or not TutorModel.verify_password(password, password_hash):
            return False
    g.child = child
    return True
