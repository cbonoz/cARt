from flask import Flask, jsonify, request
# from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# from flask_pushjack import FlaskAPNS
# from sqlalchemy.dialects.postgresql import JSON

from cart import Cart
# from notification import NotificationService, DEV_CERT_FILE, KEY_FILE, PROD_CERT_FILE

# colorama color terminal printing
# from colorama import Fore, Back, Style
# from colorama import init
# init()

import os
import json
import time
from paypalrestsdk import Payment

# from flask_socketio import SocketIO, emit
    
app = Flask(__name__)
"""
config = {
    'APNS_CERTIFICATE': DEV_CERT_FILE
}
app.config.update(config)
DB_USER = os.environ['CART_DB_USER']
DB_PASS = os.environ['CART_DB_PASS']

DB_HOST = "localhost"
PORT = '5432'

DB_STRING = "postgres://%s:%s@%s:%s/cart" % (DB_USER, DB_PASS, DB_HOST, PORT)
print('db', DB_STRING)

app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_DATABASE_URI'] = DB_STRING
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret!'
db = SQLAlchemy(app)
db.create_all()
"""


# apns_client = FlaskAPNS()
# apns_client.init_app(app)

CORS(app)

cart = Cart(port = 9002)
APP_PORT = cart.port
# ns = NotificationService()


# socketio = SocketIO(app)

### Begin Endpoints

@app.route('/hello')
def hello():
    return "Hello World!"

@app.route('/future', methods=['GET'])
def future():
    with open(cart.get_data_file('future_balance.json'), 'r') as f:
        content = json.loads(f.read())
        return jsonify(content)

@app.route('/summary', methods=['GET'])
def summary():
    with open(cart.get_data_file('summary.json'), 'r') as f:
        content = json.loads(f.read())
        return jsonify(content)

@app.route('/recurring', methods=['GET'])
def recurring():
    with open(cart.get_data_file('recurring.json'), 'r') as f:
        content = json.loads(f.read())
        return jsonify(content)

@app.route('/buy', methods=['POST'])
def buy():
    try:
        body = request.get_json()
        payment = cart.record_item(body, True)
        print(payment)
        # emit('purchase', body)
        if 'id' in payment:
            resp = payment['id']
        else:
            resp = False
        return jsonify({'ok': True, 'payment': resp})
    except Exception as e:
        return jsonify({'error': e, 'ok': False})        

@app.route('/items', methods=['GET'])
def items():
    try:
        items = cart.get_items()
        return jsonify(items)
    except Exception as e:
        return jsonify({'error': e})        

@app.route('/oktospend/<amount>', methods=['GET'])
def ok_to_spend(amount):
    try:
        amount = float(amount)
        with open(cart.get_data_file('future_balance.json'), 'r') as f:
            content = json.loads(f.read())
            print(content)
            balances = content['account'][0]['balances']
            for balance_data in balances:
                balance = balance_data['balance']['amount']
                diff = balance - amount
                if diff < 0:
                    return jsonify({
                        'ok': False,
                        'balance': diff,
                        'predicted_negative_balance_date': balance_data['date']
                    })
            return jsonify({'ok': True})
    except Exception as e:
        return jsonify({'error': e, 'ok': False})

@app.route('/payments/<limit>', methods=['GET'])
def get_payments(limit):
    try:
        limit = int(limit)
        payments = cart.get_payments(limit)
        return jsonify({'payments': payments})
    except Exception as e:
        return jsonify({'error': e, 'ok': False})   


# @socketio.on('purchase')
# def test_message(message):
#     emit('my response', {'data': 'got it!'})

if __name__ == '__main__':
    # socketio.run(app, port=APP_PORT)
    app.run(port=APP_PORT)

    print('App running on port %s' % APP_PORT)
