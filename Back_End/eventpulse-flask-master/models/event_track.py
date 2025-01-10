#!/usr/bin/python3
"""
Defines the City class.
"""
from sqlalchemy import Column, String, ForeignKey, DateTime, Float

from models.base_model import Base, BaseModel


class EventTrack(BaseModel, Base):
    """
     Event Track ORM
    """
    __tablename__ = "event_tracks"

    title = Column(String(1024), nullable=False)
    room = Column(String(128), nullable=True)
    start_date = Column(DateTime, nullable=False)
    duration = Column(Float, nullable=True)
    event_id = Column(String(60), ForeignKey('events.id'), nullable=False, )
    user_id = Column(String(60), ForeignKey('users.id'), nullable=True)

    m2x = {'user_id': 'User', 'event_id': 'Event'}
