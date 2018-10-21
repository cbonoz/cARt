from cart import Cart
from faker import Faker
import random
fake = Faker()

PRICES = [
    100,
    250,
    500,
    1000,
    5000,
    10000
]

ITEMS = [
    'headband',
    'bracelet',
    'shoes',
    'handbug',
    'purse'
]

N = 10

cart = Cart()


for i in range(N):
    item  ={
        'name': fake.company() + " " + random.choice(ITEMS),
        'address': fake.address(),
        'price': random.choice(PRICES),
        'lat': 100,
        'lng': 100
    }
    cart.record_item(item)
    print(i, item)
