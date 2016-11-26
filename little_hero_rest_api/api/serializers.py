from flask_restplus import fields
from little_hero_rest_api.api.restplus import api

child = api.model('Child entity', {
    #'id': fields.Integer(readOnly=True, description='Id of child'),
    'nickname': fields.String(required=True, description='Child nickname'),
    'password': fields.String(required=True, description='Child password'),
    'mail': fields.String(required=True, description='Child e-mail')
})

child_for_patch = api.model('Child entity for patch request', {
    'nickname': fields.String(description='Child nickname'),
    'password': fields.String(description='Child password'),
    'mail': fields.String(description='Child e-mail')
})

avatar = api.model('Avatar entity', {
    #'id': fields.Integer(readOnly=True, description='Id of avatar'),
    'name': fields.String(required=True, description='Avatar name'),
    'child_id': fields.Integer(required=True, description='Id of avatars owner (child)'),
    'tutor_id': fields.Integer(required=True, description='Id of tutors related to avatar'),
    'level': fields.Integer(required=True, description='Avatar level'),
    'health': fields.Integer(required=True, description='Avatar health'),
    'experience': fields.Integer(requried=True, description='Avatar experience points')
})

avatar_for_patch = api.model('Avatar entity for patch request', {
    #'id': fields.Integer(readOnly=True, description='Id of avatar'),
    'name': fields.String(description='Avatar name'),
    'child_id': fields.Integer(description='Id of avatars owner (child)'),
    'tutor_id': fields.Integer(description='Id of tutors related to avatar'),
    'level': fields.Integer(description='Avatar level'),
    'health': fields.Integer(description='Avatar health'),
    'experience': fields.Integer(description='Avatar experience points')
})

tutor = api.model('Tutor entity', {
    #'id': fields.Integer(readOnly=True, description='Id of tutor'),
    'password': fields.String(required=True, description='Tutor password'),
    'mail': fields.String(required=True, description='Tutor e-mail')
})

tutor_for_patch = api.model('Tutor entity for patch request', {
    #'id': fields.Integer(readOnly=True, description='Id of tutor'),
    'password': fields.String(description='Tutor password'),
    'mail': fields.String(description='Tutor e-mail')
})

item = api.model('Item entity', {
    'name': fields.String(required=True, description='Item name'),
    'price': fields.Integer(required=True, description='Item price'),
    'level': fields.Integer(required=True, description='Item level. Item is available from this level.'),
    'clazz': fields.String(required=True, description='Item class'),
    'type': fields.String(required=True, description='Item type')
})

item_for_patch = api.model('Item entity for patch request', {
    'name': fields.String(description='Item name'),
    'price': fields.Integer(description='Item price'),
    'level': fields.Integer(description='Item level. Item is available from this level.'),
    'clazz': fields.String(description='Item class'),
    'type': fields.String(description='Item type')
})
