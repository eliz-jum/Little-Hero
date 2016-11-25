from flask_restplus import fields
from little_hero_rest_api.api.restplus import api

child = api.model('Child entity', {
    'id': fields.Integer(readOnly=True, description='Id of child'),
    'name': fields.String(required=True, description='Child name')
})

avatar = api.model('Avatar entity', {
    'id': fields.Integer(readOnly=True, description='Id of avatar'),
    'name': fields.String(required=True, description='Avatar name'),
    'child_id': fields.Integer(required=True, description='Id of avatars owner (child)')
})