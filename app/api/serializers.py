from flask_restplus import fields
from app.api.restplus import api

child = api.model('Child entity', {
    'id': fields.Integer(readOnly=True, description='Id of child'),
    'name': fields.String(required=True, description='Child name')
})
