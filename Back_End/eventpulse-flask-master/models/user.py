#!/usr/bin/python3
"""Defines the User class."""
import hashlib

from sqlalchemy import Column, String, ForeignKey, Boolean

from models.base_model import Base, BaseModel


class User(BaseModel, Base):
    """
    User ORM
    """

    __tablename__ = 'users'
    email = Column(String(256), nullable=False, unique=True)
    password = Column(String(256), nullable=False)
    name = Column(String(256), nullable=False)
    phone = Column(String(128), nullable=True)
    country_id = Column(String(60), ForeignKey('countries.id'), nullable=False)
    active = Column(Boolean, default=True)

    m2x = {'country_id': 'Country'}

    def authenticate(self, pwd):
        """
        Check password validity:
        - `False` if `pwd` is `None`
        - `False` if `pwd` is not a string
        - `False` if `password` is `None`
        - Compare `password` and the MD5 value of `pwd`
        """
        if not self.active:
            return False
        if pwd is None or type(pwd) is not str:
            return False
        if self.password is None:
            return False
        encoded_pwd = hashlib.md5(pwd.encode('utf-8')).hexdigest().lower()
        return encoded_pwd == self.password
