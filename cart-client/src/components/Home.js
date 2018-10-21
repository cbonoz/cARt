import React, { Component } from 'react';
import Slogan from './Slogan';
import { Button } from 'react-bootstrap'
import animationData from './lottie/man_pay.json'

// import logo from '../assets/cart_logo_trans.png'
import LottieControl from './LottieControl';

class Home extends Component {

    render() {
        return (
            <div className='home-area'>
                <LottieControl animationData={animationData}/>
                <Slogan />
                <div className='home-main-buttons'>

                <a href="/search">
                    <Button
                        className='report-button'
                        bsStyle="info"
                        bsSize="large">
                        Consumers
                    </Button>
                </a>
                &nbsp;
                <a href="/report">
                    <Button
                        className='report-button'
                        bsStyle="info"
                        bsSize="large">
                        Merchants
                    </Button>
                </a>
                </div>
            </div>
        );
    }
}

export default Home;
