# Flask settings
#FLASK_SERVER_NAME = 'localhost:8888'
FLASK_DEBUG = True  # Do not use debug mode in production

# Flask-Restplus settings
RESTPLUS_SWAGGER_UI_DOC_EXPANSION = 'list'
RESTPLUS_VALIDATE = True
RESTPLUS_MASK_SWAGGER = False
#RESTPLUS_ERROR_404_HELP = False
RESTPLUS_EASY_SWAGGER_AUTHORIZATION = False #True only for development phase todo: make use of it
ENABLE_AUTHORIZATION = False

# SQLAlchemy settings
SQLALCHEMY_DATABASE_URI = 'postgres://quwrbyzkcxxzwa:cueQfkHYBKCJTrOiwoDnfZkO1E@ec2-54-235-124-2.compute-1.amazonaws.com:5432/dcdvmp6lvciurs'
#SQLALCHEMY_DATABASE_URI = 'sqlite:///db.sqlite'
SQLALCHEMY_TRACK_MODIFICATIONS = False

# SECURITY
SECRET_KEY = 'dev'