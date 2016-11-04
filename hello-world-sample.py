from flask import Flask
from flask_restplus import Resource, Api

app = Flask(__name__)  # Create a Flask WSGI application
api = Api(app)  # Create a Flask-RESTPlus API


@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return {'hello': 'Hello Little Hero'}


if __name__ == '__main__':
    app.run(debug=True)  # Start a development server
