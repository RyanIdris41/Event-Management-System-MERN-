#!/usr/bin/python3
"""__init__  to create a unique FileStorage instance for your application"""

from models.engine.db_storage import DBStorage

storage = DBStorage()
storage.reload()
