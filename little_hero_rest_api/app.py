# Application bootstrap file
# Logic for configuring and starting Flask app
import logging.config
import os

from flask import Flask, Blueprint
from little_hero_rest_api import settings
from little_hero_rest_api.api.endpoints.child import ns as child_namespace
from little_hero_rest_api.api.endpoints.avatar import ns as avatar_namespace
from little_hero_rest_api.api.endpoints.tutor import ns as tutor_namespace
from little_hero_rest_api.api.endpoints.item import ns as item_namespace
from little_hero_rest_api.api.endpoints.task import ns as task_namespace
from little_hero_rest_api.api.endpoints.avatar_item import ns as avatar_item_namespace
from little_hero_rest_api.api.endpoints.documentation import ns as documentation_namespace
from little_hero_rest_api.api.restplus import api, mail
from little_hero_rest_api.database import db
from flask_cors import CORS
#from werkzeug.contrib.fixers import ProxyFix

app = Flask(__name__)  # Create a Flask WSGI application
#

logging.config.fileConfig('logging.conf')
log = logging.getLogger(__name__)


from flask import request

@app.before_request
def log_request_info():
    log.debug('Path: %s %s', request.method, request.base_url)
    log.debug('Headers: %s', request.headers)
    log.debug('Body sent: %s', request.get_data())

@app.after_request
def after(response):
  # todo with response

  log.debug('Response status: %s', response.status)
  log.debug('Response headers: %s', response.headers)
  if response.content_type != 'application/javascript' and response.content_type != 'text/css; charset=utf-8' and \
      response.content_type != 'application/font-sfnt' and response.content_type != 'application/octet-stream'\
          and response.content_type != 'image/gif':
    log.debug('Body returned %s', response.get_data())
  else:
    log.debug('No body returned. application/javascript content_type')
  return response


def configure_app(flask_app):
    #flask_app.config['SERVER_NAME'] = settings.FLASK_SERVER_NAME
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = settings.SQLALCHEMY_DATABASE_URI
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = settings.SQLALCHEMY_TRACK_MODIFICATIONS
    flask_app.config['SWAGGER_UI_DOC_EXPANSION'] = settings.RESTPLUS_SWAGGER_UI_DOC_EXPANSION
    flask_app.config['RESTPLUS_VALIDATE'] = settings.RESTPLUS_VALIDATE
    flask_app.config['RESTPLUS_MASK_SWAGGER'] = settings.RESTPLUS_MASK_SWAGGER
    flask_app.config['SECRET_KEY'] = settings.SECRET_KEY
    flask_app.config['MAIL_SERVER'] = settings.MAIL_SERVER
    flask_app.config['MAIL_PORT'] = settings.MAIL_PORT
    flask_app.config['MAIL_USERNAME'] = settings.MAIL_USERNAME
    flask_app.config['MAIL_PASSWORD'] = settings.MAIL_PASSWORD
    flask_app.config['MAIL_USE_TLS'] = settings.MAIL_USE_TLS
    flask_app.config['MAIL_USE_SSL'] = settings.MAIL_USE_SSL


def initialize_app(flask_app):
    configure_app(flask_app)
    mail.init_app(flask_app)

    blueprint = Blueprint('api', __name__, url_prefix='/api')
    CORS(blueprint)
    api.init_app(blueprint)
    api.add_namespace(child_namespace)
    api.add_namespace(avatar_namespace)
    api.add_namespace(tutor_namespace)
    api.add_namespace(item_namespace)
    api.add_namespace(task_namespace)
    api.add_namespace(avatar_item_namespace)
    api.add_namespace(documentation_namespace)
    flask_app.register_blueprint(blueprint)

    db.init_app(flask_app)
    with flask_app.app_context(): #see why http://flask-sqlalchemy.pocoo.org/2.1/api/
        #db.drop_all()
        #Task.__table__.drop(db.engine)
        db.create_all()


def main():
    initialize_app(app)
    #log.info('>>>>> Starting development server at http://{}/api/ <<<<<'.format(app.config['SERVER_NAME']))
    #if 'liveconsole' not in gethostname():
    #app.debug = settings.FLASK_DEBUG
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=settings.FLASK_DEBUG)
    #app.run(debug=settings.FLASK_DEBUG)

if __name__ == "__main__":
    main()
