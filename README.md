cARt
--

An AR-based discovery app for merchants and consumers

latest ngrok: https://cb58a6af.ngrok.io

## API Spec:


### GET Requests

<pre>

    GET /future
    - get the yodlee future balances for the current user over the next month

    GET /summary
    - get the yodlee account summary based on number of infloaws and outflows

    GET /recurring
    - get the yodlee assessment of recurring payments detected in the account

    GET /items
    - returns the current set of viewed items

    GET /oktospend/{AMOUNT}
    - gets whether it's ok for the user to spend {AMOUNT} in the next 30 days.
        if ok, returns {'ok': true}
        if not ok, returns {
            "balance": -943.6799999999998,
            "ok": false,
            "predicted_negative_balance_date": "2018-10-21"
        }
</pre>


### POST Requests

<pre>
    POST /buy
    - posts a new item with the following form:
    {
        "address": "8532 Julie Well Apt. 388\nNorth Sherrymouth, GU 30455", 
        "lat": "36.12765087", 
        "lng": "-115.13396634", 
        "name": "Henson-Gilbert headband", 
        "price": 500.00
    }
    implied to be USD
</pre>

  
   




