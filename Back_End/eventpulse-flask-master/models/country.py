#!/usr/bin/python3
"""Defines the States."""
from sqlalchemy import Column, String

from models.base_model import Base, BaseModel


class Country(BaseModel, Base):
    """
    Country ORM
    """
    __tablename__ = 'countries'
    name = Column(String(128), nullable=False)
