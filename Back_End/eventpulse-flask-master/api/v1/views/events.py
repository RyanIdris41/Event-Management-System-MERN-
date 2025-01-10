#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Events """
from models.event import Event
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from

from cloudinary.uploader import upload


@app_views.route('/events', methods=['GET'], strict_slashes=False)
@swag_from('documentation/event/all_events.yml', methods=['GET'])
def get_events():
    """
    Retrieves all event objects
    """
    all_events = storage.all(Event).values()
    return make_response(jsonify([event.to_dict(anotate=['user_id', 'venue_id', 'attendees']) for event in all_events]), 200)


@app_views.route('venues/<venue_id>/events', methods=['GET'], strict_slashes=False)
@swag_from('documentation/event/venue_events.yml', methods=['GET'])
def get_events_by_venue(venue_id):
    """
    Retrieves all event objects from a given country
    """

    all_events = storage.filter(Event, venue_id=venue_id).values()
    return make_response(jsonify([event.to_dict(anotate=['user_id']) for event in all_events]), 200)


@app_views.route('countries/<country_id>/events', methods=['GET'], strict_slashes=False)
@swag_from('documentation/event/country_events.yml', methods=['GET'])
def get_events_by_country(country_id):
    """
    Retrieves all event objects from a given country
    """

    all_events = storage.filter(Event, venue_id__country_id=country_id).values()
    return jsonify([event.to_dict(anotate=['user_id', 'venue_id']) for event in all_events])


@app_views.route('/events/<event_id>', methods=['GET'], strict_slashes=False)
@swag_from('documentation/event/get_event.yml', methods=['GET'])
def get_event(event_id):
    """ Retrieves a single event """
    event = storage.get(Event, event_id)
    if not event:
        abort(404)

    return make_response(jsonify(event.to_dict(anotate=['user_id', 'venue_id', 'tracks', 'attendees'])), 200)


@app_views.route('/events/<event_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/event/delete_event.yml', methods=['DELETE'])
def delete_event(event_id):
    """
    Deletes a event Object
    """

    event = storage.get(Event, event_id)

    if not event:
        abort(404)

    storage.delete(event)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/events', methods=['POST'], strict_slashes=False)
@swag_from('documentation/event/post_event.yml', methods=['POST'])
def post_event():
    """
    Creates an event
    """
    data = request.form.to_dict()
    if type(data) is not dict:
        return make_response(jsonify({'error': 'Not a JSON'}), 400)
    required = ['title', 'venue_id', 'start_date', 'end_date', 'description', 'banner_url']
    to_ignore = ['attendees', 'tracks', 'banner_url']
    for key in to_ignore:
        if key in data:
            del data[key]
    image_file = request.files['banner']
    result = upload(image_file)
    data['banner_url'] = result['secure_url']
    for key in required:
        if key not in data:
            return make_response(jsonify({'error': 'Missing {} parameter'.format(key)}), 400)
    instance = Event(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict(anotate=['user_id', 'venue_id'])), 201)


@app_views.route('/events/<event_id>', methods=['PUT'], strict_slashes=False)
@swag_from('documentation/event/put_event.yml', methods=['PUT'])
def put_event(event_id):
    """
    Updates an event
    """
    event = storage.get(Event, event_id)

    if not event:
        abort(404)

    data = request.form.to_dict()
    if type(data) is not dict:
        return make_response(jsonify({'error': 'Not a JSON'}), 400)
    to_ignore = ['attendees', 'tracks', 'banner_url', 'user_id']
    for key in to_ignore:
        if key in data:
            del data[key]
    image_file = request.files.get('banner')
    if image_file:
        result = upload(image_file)
        data['banner_url'] = result['secure_url']
    event.update(data)
    return make_response(jsonify(event.to_dict(anotate=['user_id', 'venue_id'])), 201)
