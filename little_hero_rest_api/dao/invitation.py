from little_hero_rest_api.database import db
from little_hero_rest_api.database.models import Invitation
from little_hero_rest_api.dao.generic import GenericDAO


class InvitationDAO(GenericDAO):

    def __init__(self):
        super().__init__(Invitation)

    def get_all(self, child_id, tutor_id, kind, status):
        query = Invitation.query
        if child_id:
            query = query.filter_by(child_id=child_id)
        if tutor_id:
            query = query.filter_by(tutor_id=tutor_id)
        if kind:
            query = query.filter_by(kind=kind)
        if status:
            query = query.filter_by(status=status)

        return query.all()

    def create(self, data, id):
        kind = data.get('kind')
        status = 'pending'
        child_id = data.get('child_id')
        tutor_id = data.get('tutor_id')

        if tutor_id:
            child_id = id
        else:
            tutor_id = id

        invitation = Invitation(kind, status, child_id, tutor_id)

        db.session.add(invitation)
        db.session.commit()

        return invitation

    def update(self, id, data):
        query = Invitation.query.filter_by(id=id)
        query.update(data)
        invitation = query.one()

        db.session.commit()

        return invitation
