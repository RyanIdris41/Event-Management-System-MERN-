#!/usr/bin/python3
"""Defines the Review class."""
from sqlalchemy import Column, String, ForeignKey, Table, DateTime, Text
from sqlalchemy.orm import relationship

from models.base_model import Base, BaseModel

event_attendees = Table('event_attendees', Base.metadata,
                        Column('user_id', String(60),
                               ForeignKey('users.id'),
                               nullable=False),
                        Column('event_id', String(60),
                               ForeignKey('events.id'),
                               nullable=False)
                        )


class Event(BaseModel, Base):
    """
    Event ORM
    """
    __tablename__ = 'events'

    title = Column(String(1024), nullable=False)
    description = Column(Text, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    banner_url = Column(String(2048), nullable=False)
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    venue_id = Column(String(60), ForeignKey('venues.id'), nullable=False)
    attendees = relationship("User", secondary=event_attendees, viewonly=False, cascade="all, delete")
    tracks = relationship("EventTrack", backref="event", cascade="all, delete, delete-orphan")

    m2x = {'tracks': 'EventTrack', 'attendees': 'User', 'user_id': 'User', 'venue_id': 'Venue'}
