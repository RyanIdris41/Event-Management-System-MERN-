#!/usr/bin/python3
""" objects that handles all default RestFul API actions for Event Tracks"""
from models.event import Event
from models.event_track import EventTrack
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from


@app_views.route('events/<event_id>/event_tracks', methods=['GET'], strict_slashes=False)
@swag_from('documentation/event_track/all_tracks.yml', methods=['GET'])
def get_event_tracks_by_event(event_id):
    """
    Retrieves all event_track objects
    """
    all_event_tracks = storage.filter(EventTrack, event_id=event_id).values()
    return make_response(jsonify([event_track.to_dict(anotate=['user_id']) for event_track in all_event_tracks]), 200)


@app_views.route('/event_tracks/<event_track_id>', methods=['GET'], strict_slashes=False)
@swag_from('documentation/event_track/get_track.yml', methods=['GET'])
def get_event_track(event_track_id):
    """
    Retrieves an event_track Object
    """

    event_track = storage.get(EventTrack, event_track_id)

    if not event_track:
        abort(404)

    return make_response(jsonify(event_track.to_dict(anotate=['user_id', 'event_id'])), 200)


@app_views.route('/events/<event_id>/event_tracks', methods=['POST'], strict_slashes=False)
@swag_from('documentation/event_track/post_track.yml', methods=['POST'])
def post_event_track(event_id):
    """
    Creates an event_track
    """
    event = storage.get(Event, event_id)
    if not event:
        abort(404)
    data = request.get_json()
    if type(data) is not dict:
        return make_response(jsonify({'error': 'Not a JSON'}), 400)

    data.update({'event_id': event_id})
    required = ['title', 'event_id', 'start_date']
    for key in required:
        if key not in data:
            return make_response(jsonify({'error': "Missing {} parameter".format(key)}), 400)

    instance = EventTrack(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict(anotate=['user_id'])), 201)


@app_views.route('/event_tracks/<event_track_id>', methods=['DELETE'], strict_slashes=False)
@swag_from('documentation/event_track/delete_track.yml', methods=['DELETE'])
def delete_event_track(event_track_id):
    """
    Deletes a event_track Object
    """

    event_track = storage.get(EventTrack, event_track_id)

    if not event_track:
        abort(404)

    storage.delete(event_track)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/event_tracks/<event_track_id>', methods=['PUT'], strict_slashes=False)
@swag_from('documentation/event_track/put_track.yml', methods=['PUT'])
def put_event_track(event_track_id):
    """
    Updates an event_track
    """
    event_track = storage.get(EventTrack, event_track_id)

    if not event_track:
        abort(404)

    data = request.get_json()

    if type(data) is not dict:
        return make_response(jsonify({'error': 'Not a JSON'}), 400)

    event_track.update(data)
    return make_response(jsonify(event_track.to_dict()), 200)
