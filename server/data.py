import random
from cart import Cart
from faker import Faker
fake = Faker()

PRICES = list(map(lambda x: x - .01, [
    25,
    50,
    80,
    100,
    250,
    500,
    900,
]))

ITEMS = [
    'Headband',
    'Bracelet',
    'Shoes',
    'Handbag',
    'Purse',
    'Watch'
]

N = 20

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
        'currency': "USD",
        'lat': lat,
        'lng': lng
    }
    cart.record_item(item, False)
    print(i, item)
