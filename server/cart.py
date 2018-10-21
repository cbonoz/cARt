import os

DATA_DIR = "./data"

from tinydb import TinyDB, Query
import paypalrestsdk
from paypalrestsdk import Payment
from faker import Faker
fake = Faker()

import logging
import uuid
import os

# https://developer.paypal.com/docs/api/identity/v1/

paypalrestsdk.configure({
  "mode": "sandbox", # sandbox or live
  "client_id": os.getenv('PAYPAL_CLIENT_ID') or "EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM",
  "client_secret": os.getenv('PAYPAL_CLIENT_SECRET') or "EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM" })

class Cart:

    def __init__(self, port = 9001):
        self.port = port
        self.db = TinyDB('db/db.json')

    def create_payment(self, item, amount = 1):
        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"},
            "redirect_urls": {
                "return_url": "http://localhost:%s/payment/execute" % self.port,
                "cancel_url": "http://localhost:3000/"},
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": item['name'],
                        "sku": str(uuid.uuid4()),
                        "price": item['price'],
                        "currency": "USD",
                        "quantity": amount}]},
                "amount": {
                    "total": item['price'] * amount,
                    "currency": "USD"},
                "description": "This is the payment transaction description."}]})
        if payment.create():
            print("Payment created successfully")
        else:
            print(payment.error)
        return payment

    def get_payments(self, count = 10):
        payment_history = Payment.all({"count": count}).payments
        return payment_history

    def get_data_file(self, filename):
        return os.path.join(DATA_DIR, filename)

    def record_item(self, item, payment=True):
        if 'user' not in item:
            item['user'] = fake.name()

        if 'converted' not in item:
            item['converted'] = random.choice([True, False])
        res = False
        if payment:
            res = self.create_payment(item, 1)
        self.db.insert(item)
        return res

    def get_items(self):
        return self.db.all()
