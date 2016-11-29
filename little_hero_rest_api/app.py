# Application bootstrap file
# Logic for configuring and starting Flask app
import logging.config
import os
from socket import gethostname

from flask import Flask, Blueprint
from little_hero_rest_api import settings
from little_hero_rest_api.api.endpoints.child import ns as children_namespace
from little_hero_rest_api.api.endpoints.avatar import ns as avatar_namespace
from little_hero_rest_api.api.endpoints.tutor import ns as tutor_namespace
from little_hero_rest_api.api.endpoints.item import ns as item_namespace
from little_hero_rest_api.api.endpoints.task import ns as task_namespace
from little_hero_rest_api.api.endpoints.avatar_item import ns as avatar_item_namespace
from little_hero_rest_api.api.restplus import api
from little_hero_rest_api.database import db

app = Flask(__name__)  # Create a Flask WSGI application
logging.config.fileConfig('logging.conf')
log = logging.getLogger(__name__)

def configure_app(flask_app):
    #flask_app.config['SERVER_NAME'] = settings.FLASK_SERVER_NAME
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = settings.SQLALCHEMY_DATABASE_URI
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = settings.SQLALCHEMY_TRACK_MODIFICATIONS
    flask_app.config['SWAGGER_UI_DOC_EXPANSION'] = settings.RESTPLUS_SWAGGER_UI_DOC_EXPANSION
    flask_app.config['RESTPLUS_VALIDATE'] = settings.RESTPLUS_VALIDATE
    flask_app.config['RESTPLUS_MASK_SWAGGER'] = settings.RESTPLUS_MASK_SWAGGER
    flask_app.config['ERROR_404_HELP'] = settings.RESTPLUS_ERROR_404_HELP


def initialize_app(flask_app):
    configure_app(flask_app)

    blueprint = Blueprint('api', __name__, url_prefix='/api')
    api.init_app(blueprint)
    api.add_namespace(children_namespace)
    api.add_namespace(avatar_namespace)
    api.add_namespace(tutor_namespace)
    api.add_namespace(item_namespace)
    api.add_namespace(task_namespace)
    api.add_namespace(avatar_item_namespace)
    flask_app.register_blueprint(blueprint)

    db.init_app(flask_app)
    with flask_app.app_context(): #see why http://flask-sqlalchemy.pocoo.org/2.1/api/
        db.drop_all()
        db.create_all()


def main():
    initialize_app(app)
    #log.info('>>>>> Starting development server at http://{}/api/ <<<<<'.format(app.config['SERVER_NAME']))
    #if 'liveconsole' not in gethostname():
    #app.debug = settings.FLASK_DEBUG
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
    app.run(debug=settings.FLASK_DEBUG)


if __name__ == "__main__":
    main()