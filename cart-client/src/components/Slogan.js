import React, { Component } from 'react';
import ReactRotatingText from 'react-rotating-text'

class Slogan extends Component {
    render() {
        const items = [
            'Small Businesses',
            'Online Stores',
            'Expo Stores',
            'Small Merchants',
            'Individuals'
        ]
        return (
            <div className='slogan-text'>
                <p>
                    Bringing eCommerce to the uneCommerced for&nbsp;<br />
                    <span>
                        <ReactRotatingText items={items} />
                    </span>.
                </p>
            </div>
        );
    }
}

export default Slogan;