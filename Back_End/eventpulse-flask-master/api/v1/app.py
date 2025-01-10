#!/usr/bin/python3
""" Flask Application """
from os import environ

from flasgger import Swagger
from flask import Flask, make_response, jsonify
from flask_cors import CORS

from api.v1.views import app_views
from models import storage

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.register_blueprint(app_views)
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})


@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    responses:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({'error': "Not found"}), 404)


app.config['SWAGGER'] = {
    'title': 'EventPulse API',
    'version': "1.0.0",
}

Swagger(app)

if __name__ == "__main__":
    """ Main Function """
    host = environ.get('EVENTPULSE_HOST')
    port = environ.get('EVENTPULSE_PORT')
    if not host:
        host = '0.0.0.0'
    if not port:
        port = 5000
    app.run(host=host, port=port, threaded=True)
