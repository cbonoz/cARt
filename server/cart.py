import os

DATA_DIR = "./data"

from tinydb import TinyDB, Query
import paypalrestsdk
import logging
import uuid

# https://developer.paypal.com/docs/api/identity/v1/

paypalrestsdk.configure({
  "mode": "sandbox", # sandbox or live
  "client_id": process.env.PAYPAL_CLIENT_ID or "EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM",
  "client_secret": process.env.PAYPAL_CLIENT_SECRET or "EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM" })

class Cart:

    def __init__(self, port = 9001):
        self.port = port
        self.db = TinyDB('db/db.json')

    def create_payment(self, item, amount=1)
        payment = paypalrestsdk.Payment({
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"},
            "redirect_urls": {
                "return_url": "http://localhost:%s/payment/execute",
                "cancel_url": "http://localhost:3000/"},
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": item.name,
                        "sku": uuid.uuid4(),
                        "price": item.price,
                        "currency": "USD",
                        "quantity": amount}]},
                "amount": {
                    "total": item.price * amount,
                    "currency": "USD"},
                "description": "This is the payment transaction description."}]})

    if payment.create():
        print("Payment created successfully")
    else:
        print(payment.error)
    return payment

    def get_data_file(self, filename):
        return os.path.join(DATA_DIR, filename)

    def record_item(self, item):
        self.create_payment(item, amount)
        self.db.insert(item)
        return True

    def get_items(self):
        return self.db.all()
