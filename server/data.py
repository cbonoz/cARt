import random
from cart import Cart
from faker import Faker
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
locations = []

with open('db/locations.csv', 'r') as f:
    for pos in f:
        tokens = pos.split(',')
        locations.append([tokens[1], tokens[3]])

for i in range(N):
    lat = locations[i][0]
    lng = locations[i][1]
    item  = {
        'name': fake.company() + " " + random.choice(ITEMS),
        'address': fake.address(),
        'price': random.choice(PRICES),
        'lat': lat,
        'lng': lng
    }
    cart.record_item(item, False)
    print(i, item)
