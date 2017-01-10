import logging
import traceback

from flask_restplus import Api
from little_hero_rest_api import settings
from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.exc import IntegrityError

log = logging.getLogger(__name__)

# authorizations = {
#     'Basic': {
#         'type': 'basic',
#         'in': 'header',
#         'name': 'Authorization'
#     }
# }

# api = Api(version='1.2', title='Little Hero API', authorizations=authorizations,
#           security='Basic', description='Little Hero API for Little Hero mobile application',
#           contact='Dawid Jurkiewicz', contact_email='dawjur@st.amu.edu.pl')
api = Api(version='1.2', title='Little Hero API', description='API for Little Hero mobile application',
          contact='Dawid Jurkiewicz', contact_email='dawjur@st.amu.edu.pl',
          contact_url='https://github.com/siulkilulki')


@api.errorhandler
def default_error_handler(e):
    message = 'An unhandled exception occurred.'
    log.exception(message)

    if not settings.FLASK_DEBUG:
        return {'message': message}, 500


@api.errorhandler(NoResultFound)
def database_not_found_error_handler(e):
    log.warning(traceback.format_exc())
    return {
               'code': 404,
               'message': 'A database result was required but none was found.'
           }, 404


@api.errorhandler(IntegrityError)
def integrity_error_handler(e):
    log.warning(traceback.format_exc())
    return {
               'code': 400,
               'message': __format_error_message(str(e.orig))
           }, 400


def __format_error_message(message):
    message = message.replace('\n', ' ').replace('\"', '\'')
    return message
