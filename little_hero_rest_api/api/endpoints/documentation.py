import logging

from little_hero_rest_api.api.restplus import api
from flask_restplus import Resource
import json

log = logging.getLogger(__name__)

ns = api.namespace('v1/documentation', description='Endpoint for getting documentation in json')


@ns.route('/')
class Documentation(Resource):
    """Alternative way to get swagger.json Api documentation"""
    #todo: export postman doc
    def get(self):
        return json.loads(json.dumps(api.__schema__))