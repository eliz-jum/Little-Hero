import logging
import traceback

from flask_restplus import Api
from little_hero_rest_api import settings
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.exc import IntegrityError
from flask_restplus import fields
from werkzeug.exceptions import Unauthorized

log = logging.getLogger(__name__)

authorizations = {
    'HMAC': {
        'type': 'hmac',
        'in': 'header',
        'name': 'Authorization'
    }
}


authorizations_header_desc = 'Expecting: hmac {posix_time}:{nonce}:{b64encoded_digest}'
# api = Api(version='1.2', title='Little Hero API', , description='Little Hero API for Little Hero mobile application',
#           contact='Dawid Jurkiewicz', contact_email='dawjur@st.amu.edu.pl')
api = Api(version='1.2', title='Little Hero API', description='API for Little Hero mobile application',
          contact='Dawid Jurkiewicz', contact_email='dawjur@st.amu.edu.pl',
          contact_url='jurkiewicz.dawid@mylittlehero.eu', authorizations=authorizations,
          security='HMAC')

# todo: move to serializers
error_fields = api.model('Errors fields', {
    'code': fields.Integer(required=True, description='HTTP status code'),
    'message': fields.String(required=True, description='Error message')
})


@api.errorhandler(BaseException)
@api.marshal_with(error_fields)
def default_error_handler(e):
    """Raised when internal unhandled server error"""
    message = 'An unhandled exception occurred.'
    log.exception(message)

    if not settings.FLASK_DEBUG:
        return {
                   'code': 500,
                   'message': message
               }, 500


@api.errorhandler(NoResultFound)
@api.marshal_with(error_fields)
def database_not_found_error_handler(e):
    """Raised when no result in database found"""
    log.warning(traceback.format_exc())
    log.debug(e)
    return {
               'code': 404,
               'message': 'A database result was required but none was found.'
           }, 404


@api.errorhandler(IntegrityError)
@api.marshal_with(error_fields)
def integrity_error_handler(e):
    """Raised when the relational integrity of the database is affected, e.g.
    a foreign key check fails, duplicate key, etc."""
    log.warning(traceback.format_exc())
    log.debug(__format_error_message(str(e.orig)))
    return {
               'code': 400,
               'message': __format_error_message(str(e.orig))
           }, 400


@api.errorhandler(Unauthorized)
@api.marshal_with(error_fields)
def authorization_error_handler(e):
    """Raised when unauthorized access happened."""
    log.warning(traceback.format_exc())
    return {
               'code': 401,
               'message': 'Unauthorized access!'
           }, 401


def __format_error_message(message):
    message = message.replace('\n', ' ').replace('\"', '\'')
    return message
