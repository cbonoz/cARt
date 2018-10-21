from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_pushjack import FlaskAPNS
from sqlalchemy.dialects.postgresql import JSON

from cart import Cart
# from notification import NotificationService, DEV_CERT_FILE, KEY_FILE, PROD_CERT_FILE

# colorama color terminal printing
from colorama import Fore, Back, Style
from colorama import init
init()

import os
import json
import time

from flask_socketio import SocketIO, emit
    
app = Flask(__name__)

config = {
    'APNS_CERTIFICATE': DEV_CERT_FILE
}

DB_USER = os.environ['CART_DB_USER']
DB_PASS = os.environ['CART_DB_PASS']

DB_HOST = "localhost"
PORT = '5432'
APP_PORT = 9001

DB_STRING = "postgres://%s:%s@%s:%s/cart" % (DB_USER, DB_PASS, DB_HOST, PORT)
print('db', DB_STRING)

app = Flask(__name__)
app.config.update(config)
# app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_DATABASE_URI'] = DB_STRING
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret!'

apns_client = FlaskAPNS()
apns_client.init_app(app)

CORS(app)

db = SQLAlchemy(app)

db.create_all()
cart = Cart()
ns = NotificationService()

socketio = SocketIO(app)

### Begin Endpoints

@app.route('/hello')
def hello():
    return "Hello World!"

@app.route('/buy', methods=['POST'])
def buy():
    try:
        body = request.get_json()
    except Exception as e:
        return jsonify{{'error': e})


@app.route('/oktospend', methods=['POST'])
def ok_to_spend():
    try:
        # body = json.loads(request.data)
        body = request.get_json()
        # print('request predict', body)

        data = body['data']
        return jsonify({})
    except Exception as e:
        return jsonify{{'error': e})

@socketio.on('purchase')
def test_message(message):
    emit('my response', {'data': 'got it!'})

if __name__ == '__main__':
    # app.run(port=APP_PORT)
    socketio.run(app, port=APP_PORT)

    print('App running on port %s' % APP_PORT)
