#!/usr/bin/python3
"""
Contains class BaseModel
"""
import hashlib
import uuid
from datetime import datetime, date

from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

import models

DATETIME_FORMAT = "%Y-%m-%d %H:%M:%S"
DATE_FORMAT = "%Y-%m-%d %H:%M:%S"

Base = declarative_base()


class BaseModel:
    """The BaseModel class from which future classes will be derived"""
    id = Column(String(60), primary_key=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)

    m2x = {}

    @staticmethod
    def _refined_kwargs(kwargs, create=False):
        """Format the parameters for use when creating or updating a record"""
        to_ignore = ['id', 'created_at', 'updated_at', '__class__', '_sa_instance_state']
        kwargs = {k: v for k, v in kwargs.items() if k not in to_ignore}
        if 'password' in kwargs:
            kwargs['password'] = hashlib.md5(kwargs['password'].encode('utf-8')).hexdigest().lower()
        if create:
            kwargs['id'] = str(uuid.uuid4())
            kwargs['created_at'] = datetime.utcnow()
            kwargs['updated_at'] = datetime.utcnow()
        return kwargs

    def __init__(self, *args, **kwargs):
        """Initialization of the base model"""
        kwargs = self._refined_kwargs(kwargs, create=True)
        for k, v in kwargs.items():
            setattr(self, k, v)

    def __str__(self):
        """String representation of the BaseModel class"""
        return "[{:s}] ({:s}) {}".format(self.__class__.__name__, self.id,
                                         self.__dict__)

    def save(self):
        """updates the attribute 'updated_at' with the current datetime"""
        self.updated_at = datetime.utcnow()
        models.storage.new(self)
        models.storage.save()

    def to_dict(self, anotate=[]):
        """returns a dictionary containing all keys/values of the instance"""
        from models.event import Event
        from models.country import Country
        from models.user import User
        from models.event_track import EventTrack
        from models.venue import Venue

        m2x_keys = list(self.m2x.keys())
        special_keys = ['_sa_instance_state', '__class__', 'password'] + m2x_keys
        res = self.__dict__.copy()
        for k, v in res.items():
            if type(res[k]) is datetime:
                res[k] = res[k].strftime(DATETIME_FORMAT)
            elif type(res[k]) is date:
                res[k] = res[k].strftime(DATE_FORMAT)

        res = {k: v for k, v in res.items() if k not in special_keys}
        for k in anotate:
            if k in m2x_keys:
                val = getattr(self, k)
                if type(val) is str:
                    model = eval(self.m2x[k])
                    record = models.storage.get(model, val)
                    res[k] = record.to_dict(anotate=[k for k, v in record.m2x.items() if self.__class__.__name__ != v])
                else:
                    res[k] = [record.to_dict(anotate=[k for k, v in record.m2x.items() if self.__class__.__name__ != v]) for record in val]

        return res

    def delete(self):
        """delete the current instance from the storage"""
        models.storage.delete(self)

    def update(self, kwargs):
        """Update the current record"""
        kwargs = self._refined_kwargs(kwargs)
        for k, v in kwargs.items():
            setattr(self, k, v)
        self.save()
