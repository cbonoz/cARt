import os

DATA_DIR = "./data"

from tinydb import TinyDB, Query

class Cart:

    def __init__(self):
        self.db = TinyDB('db/db.json')

    def get_data_file(self, filename):
        return os.path.join(DATA_DIR, filename)

    def record_item(self, item):
        db.insert(item)
        return True

    def get_items(self):
        return db.all()
