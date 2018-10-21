import os

DATA_DIR = "./data"

from tinydb import TinyDB, Query

import paypalrestsdk
paypalrestsdk.configure({
  "mode": "sandbox", # sandbox or live
  "client_id": process.env.PAYPAL_CLIENT_ID or "EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM",
  "client_secret": process.env.PAYPAL_CLIENT_SECRET or "EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM" })

class Cart:

    def __init__(self):
        self.db = TinyDB('db/db.json')

    def get_data_file(self, filename):
        return os.path.join(DATA_DIR, filename)

    def record_item(self, item):
        self.db.insert(item)
        return True

    def get_items(self):
        return self.db.all()
