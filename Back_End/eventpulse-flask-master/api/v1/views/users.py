#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Users """
from flasgger import swag_from
from flask import abort, jsonify, make_response, request

from api.v1.views import app_views
from models import storage
from models.user import User


@app_views.route('/users', methods=['GET'], strict_slashes=False)
@swag_from('documentation/user/all_users.yml', methods=['GET'])
def get_users():
    """
    Retrieves the list of all user objects
    """
    all_users = storage.all(User).values()
    return jsonify([user.to_dict(anotate=['country_id']) for user in all_users])


@app_views.route('countries/<country_id>/users', methods=['GET'], strict_slashes=False)
@swag_from('documentation/user/country_users.yml', methods=['GET'])
def get_country_users(country_id):
    """
    Retrieves the list of all user objects
    """
    users = storage.filter(User, country_id=country_id).values()
    return jsonify([user.to_dict() for user in users])


@app_views.route('/users/<user_id>', methods=['GET'], strict_slashes=False)
@swag_from('documentation/user/get_user.yml', methods=['GET'])
def get_user(user_id):
    """ Retrieves a single user """
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    return jsonify(user.to_dict(anotate=['country_id']))


@app_views.route('/users/<user_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/user/delete_user.yml', methods=['DELETE'])
def delete_user(user_id):
    """
    Deletes a user Object
    """

    user = storage.get(User, user_id)

    if not user:
        abort(404)

    storage.delete(user)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/users', methods=['POST'], strict_slashes=False)
@swag_from('documentation/user/post_user.yml', methods=['POST'])
def post_user():
    """
    Creates a user
    """
    data = request.get_json()
    if type(data) is not dict:
        return make_response(jsonify({'error': 'Not a JSON'}), 400)

    required_keys = ['email', 'password', 'phone', 'country_id']
    for k in required_keys:
        if k not in data:
            return make_response(jsonify({'error': "Missing {}".format(k)}), 400)
    user = storage.filter(User, email=data.get('email'))
    if user:
        return make_response(jsonify({'error': "A user with the given email already exist"}), 400)

    instance = User(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict(anotate=['country_id'])), 201)


@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
@swag_from('documentation/user/put_user.yml', methods=['PUT'])
def put_user(user_id):
    """
    Updates a user
    """
    user = storage.get(User, user_id)

    if not user:
        abort(404)

    data = request.get_json()
    if type(data) is not dict:
        return make_response(jsonify({'error': 'Not a JSON'}), 400)

    if 'email' in data:
        del data['email']

    user.update(data)
    return make_response(jsonify(user.to_dict(anotate=['country_id'])), 200)


@app_views.route('/login', methods=['POST'], strict_slashes=False)
@swag_from('documentation/user/authenticate_user.yml', methods=['POST'])
def authenticate_user():
    """
    Updates a user
    """
    data = request.get_json()
    if type(data) is not dict:
        return make_response(jsonify({'error': 'Not a JSON'}), 400)
    required_keys = ['email', 'password']
    for k in required_keys:
        if k not in data:
            return make_response(jsonify({'error': 'Missing {}'.format(k)}), 401)
    users = list(storage.filter(User, email=data.get('email')).values())
    if not users:
        return make_response(jsonify({'error': 'Invalid credentials'}), 401)
    user = users[0]

    if not user.authenticate(data.get('password')):
        return make_response(jsonify({'error': 'Invalid credentials'}), 401)

    return make_response(jsonify(user.to_dict(anotate=['country_id'])), 200)
