import logging

from flask import request, jsonify, g

from little_hero_rest_api.api.restplus import api
from flask_restplus import Resource
from little_hero_rest_api.dao.child import ChildDAO
from little_hero_rest_api.dao.invitation import InvitationDAO
from little_hero_rest_api.database.models import Child as ChildModel
from little_hero_rest_api.api.serializers import (child_for_post, child_full, child_for_patch, invitation_full,
                                                  child_invitation_for_post, invitation_for_patch, tutor_full)
from flask_httpauth import HTTPBasicAuth

log = logging.getLogger(__name__)

ns = api.namespace('v1/children', description='Operations related to children')
auth = HTTPBasicAuth()

child_dao = ChildDAO()
invitation_dao = InvitationDAO()


@ns.route('/')
@ns.response(400, 'Bad request')
class ChildrenCollection(Resource):
    """Show a list of all children and lets you POST to add new child."""

    @api.marshal_list_with(child_full)
    def get(self):
        """Returns list of children."""
        children = child_dao.get_all()
        return children

    @api.response(201, 'Child created.')
    @api.expect(child_for_post)
    @ns.marshal_with(child_full)
    def post(self):
        """Create child"""
        data = request.json
        return child_dao.create(data), 201


@ns.route('/<int:id>')
@ns.response(404, 'Child not found')
@ns.response(400, 'Bad request')
@ns.param('id', 'The child identifier')
class Child(Resource):
    """Show a single child entity and lets you delete and update it"""
    @auth.login_required
    @api.doc(security='Basic')
    @ns.marshal_with(child_full)
    def get(self, id):
        """Returns child"""
        child = child_dao.get(id)
        return child

    @ns.response(204, 'Child deleted')
    def delete(self, id):
        """Delete a child given its identifier"""
        child_dao.delete(id)
        return None, 204

    @ns.response(200, 'Child updated')
    @api.expect(child_for_patch)
    @ns.marshal_with(child_full)
    def patch(self, id):
        """Update child given only its parameters that should be updated"""
        data = request.json
        updated_child = child_dao.update(id, data)
        return updated_child, 200


@ns.route('/<int:id>/tutors')
@ns.response(404, 'Child not found')
@ns.response(400, 'Bad request')
@ns.param('id', 'The child identifier')
class ChildTutors(Resource):
    """Returns list of child tutors"""

    @ns.marshal_list_with(tutor_full)
    def get(self, id):
        return child_dao.get_all_tutors(id)


@ns.route('/<int:id>/invitations')
@ns.response(404, 'Child not found')
@ns.response(400, 'Bad request')
@ns.param('id', 'The child identifier')
class ChildInvitationsCollection(Resource):
    """Show a list of all child invitations and lets you POST to add new invitation."""

    @api.marshal_list_with(invitation_full)
    @ns.param('kind', 'For filtering by type of invitation', 'query')
    @ns.param('status', 'For filtering by status of invitation', 'query')
    def get(self, id):
        """Returns list of invitations."""
        kind = request.args.get('kind')
        status = request.args.get('status')
        invitations = invitation_dao.get_all(id, None, kind, status)
        return invitations

    @api.response(201, 'Invitation created.')
    @api.expect(child_invitation_for_post)
    @ns.marshal_with(invitation_full)
    def post(self, id):
        """Create invitations"""
        data = request.json
        return invitation_dao.create(data, id), 201

from flask_restplus import reqparse

parser = reqparse.RequestParser()
parser.add_argument('Authorization', location='headers')


@ns.route('/token')
@ns.response(400, 'Bad request')
class ChildSecurity(Resource):
    @auth.login_required
    @api.doc(security='Basic')
    @api.expect(parser)
    def get(self):
        """Get token for authentication"""
        token = g.child.generate_auth_token()
        return jsonify({'token': token.decode('ascii')})


@ns.route('/<int:child_id>/invitations/<int:invitation_id>')
@ns.response(404, 'Child not found')
@ns.response(400, 'Bad request')
@ns.param('child_id', 'The child identifier')
@ns.param('invitation_id', 'The invitation identifier')
class ChildInvitation(Resource):
    """Show a single invitation entity and lets you delete and update it"""

    @api.marshal_with(invitation_full)
    def get(self, child_id, invitation_id):
        """Return invitation"""
        # child_id = request.args.get('child_id')
        # invitation_id = request.args.get('invitation_id')
        return invitation_dao.get(invitation_id)

    @ns.response(204, 'Invitation deleted')
    def delete(self, child_id, invitation_id):
        """Delete an invitation given its identifier"""
        invitation_dao.delete(invitation_id)
        return None, 204

    @ns.response(200, 'Invitation updated')
    @api.expect(invitation_for_patch)
    @ns.marshal_with(invitation_full)
    def patch(self, child_id, invitation_id):
        """Update status of invitation"""
        data = request.json
        updated_invitation = invitation_dao.update(invitation_id, data)
        return updated_invitation, 200


@auth.verify_password
def verify_password(login_or_token, password):
    child = ChildModel.verify_auth_token(login_or_token)
    if not child:
        child = child_dao.get_child_by_login(login_or_token)
        password_hash = child.password
        if not child or not ChildModel.verify_password(password, password_hash):
            return False
    g.child = child
    return True
