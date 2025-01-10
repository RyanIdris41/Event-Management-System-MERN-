#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Countries """
from flasgger import swag_from
from flask import abort, jsonify, make_response, request

from api.v1.views import app_views
from models import storage
from models.country import Country


@app_views.route('/countries', methods=['GET'], strict_slashes=False)
@swag_from('documentation/country/all_countries.yml', methods=['GET'])
def get_countries():
    """
    Retrieves all country objects
    """
    all_countries = storage.all(Country).values()
    return make_response(jsonify([country.to_dict() for country in all_countries]), 200)


@app_views.route('/countries/<country_id>', methods=['GET'], strict_slashes=False)
@swag_from('documentation/country/get_country.yml', methods=['GET'])
def get_country(country_id):
    """ Retrieves a single country """
    country = storage.get(Country, country_id)
    if not country:
        abort(404)

    return make_response(jsonify(country.to_dict()), 200)


@app_views.route('/countries/<country_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/country/delete_country.yml', methods=['DELETE'])
def delete_country(country_id):
    """
    Deletes a country Object
    """

    country = storage.get(Country, country_id)

    if not country:
        abort(404)

    storage.delete(country)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/countries', methods=['POST'], strict_slashes=False)
@swag_from('documentation/country/post_country.yml', methods=['POST'])
def post_country():
    """
    Creates a country
    """
    data = request.get_json()
    if type(data) is not dict:
        return make_response(jsonify({'error': 'Not a JSON'}), 400)

    if 'name' not in data:
        return make_response(jsonify({'error': 'Missing name parameter'}), 400)

    country = storage.filter(Country, name=data.get('name'))
    if country:
        return make_response(jsonify({'error': 'A country with the given name already exist'}), 400)

    instance = Country(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/countries/<country_id>', methods=['PUT'], strict_slashes=False)
@swag_from('documentation/country/put_country.yml', methods=['PUT'])
def put_country(country_id):
    """
    Updates a country
    """
    country = storage.get(Country, country_id)

    if not country:
        abort(404)

    data = request.get_json()

    if type(data) is not dict:
        return make_response(jsonify({'error': 'Not a JSON'}), 400)

    country.update(data)
    return make_response(jsonify(country.to_dict()), 200)
