#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Event Attendees"""
from flasgger import swag_from
from flask import abort, jsonify, make_response

from api.v1.views import app_views
from models import storage
from models.event import Event
from models.user import User


@app_views.route('events/<event_id>/users', methods=['GET'], strict_slashes=False)
@swag_from('documentation/event_attendee/all_attendees.yml', methods=['GET'])
def get_event_attendees(event_id):
    """
    Retrieves all event attendees
    """
    event = storage.get(Event, event_id)
    if not event:
        abort(404)
    return make_response(jsonify([user.to_dict(anotate=['country_id']) for user in event.attendees]), 200)


@app_views.route('events/<event_id>/users/<user_id>', methods=['POST'], strict_slashes=False)
@swag_from('documentation/event_attendee/post_attendee.yml', methods=['POST'])
def post_attendee(event_id, user_id):
    """
    Add a user to the event attendees
    """
    event = storage.get(Event, event_id)
    user = storage.get(User, user_id)
    if not event or not user:
        abort(404)
    if user not in event.attendees:
        event.attendees.append(user)
        event.save()
    return make_response(jsonify(user.to_dict(anotate=['country_id'])), 201)


@app_views.route('events/<event_id>/users/<user_id>', methods=['DELETE'], strict_slashes=False)
@swag_from('documentation/event_attendee/delete_attendee.yml', methods=['DELETE'])
def delete_attendee(event_id, user_id):
    """
    Remove a user from the event attendees
    """
    event = storage.get(Event, event_id)
    user = storage.get(User, user_id)
    if not event or not user:
        abort(404)
    if user in event.attendees:
        event.attendees.remove(user)
        event.save()
    return make_response(jsonify({}), 200)
