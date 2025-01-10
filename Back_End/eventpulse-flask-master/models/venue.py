#!/usr/bin/python3
"""Defines the Place class."""
from sqlalchemy import Column, String, ForeignKey, Text

from models.base_model import Base, BaseModel


class Venue(BaseModel, Base):
    """
    Venue ORM
    """
    __tablename__ = 'venues'

    name = Column(String(1028), nullable=False)
    address = Column(String(1028), nullable=False)
    country_id = Column(String(60), ForeignKey('countries.id'), nullable=False)

    m2x = {'country_id': 'Country'}

