from flask_restplus import fields
from little_hero_rest_api.api.restplus import api

child = api.model('Child entity', {
    'id': fields.Integer(readOnly=True, description='Id of child'),
    'nickname': fields.String(required=True, description='Child nickname'),
    'password': fields.String(required=True, description='Child password'),
    'mail': fields.String(required=True, description='Child e-mail')
})

avatar = api.model('Avatar entity', {
    'id': fields.Integer(readOnly=True, description='Id of avatar'),
    'name': fields.String(required=True, description='Avatar name'),
    'child_id': fields.Integer(required=True, description='Id of avatars owner (child)'),
    'tutor_id': fields.Integer(required=True, description='Id of tutors related to avatar'),
    'level': fields.Integer(required=True, description='Avatar level'),
    'health': fields.Integer(required=True, description='Avatar health'),
    'experience': fields.Integer(requried=True, description='Avatar experience points')
})

tutor = api.model('Tutor entity', {
    'id': fields.Integer(readOnly=True, description='Id of tutor'),
    'password': fields.String(required=True, description='Tutor password'),
    'mail': fields.String(required=True, description='Tutor e-mail')
})
