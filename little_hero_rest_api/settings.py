# Flask settings
#FLASK_SERVER_NAME = 'localhost:8888'
FLASK_DEBUG = True  # Do not use debug mode in production

# Flask-Restplus settings
RESTPLUS_SWAGGER_UI_DOC_EXPANSION = 'list'
RESTPLUS_VALIDATE = True
RESTPLUS_MASK_SWAGGER = False
RESTPLUS_ERROR_404_HELP = False

# SQLAlchemy settings
SQLALCHEMY_DATABASE_URI = 'postgres://rvkvhelrohxojg:USAoAPKJtG8wQB-0wkq8vTAbcY@ec2-54-75-232-53.eu-west-1.compute.amazonaws.com:5432/d2kfg13n79r4rq'
SQLALCHEMY_TRACK_MODIFICATIONS = False
