import React, { Component } from 'react';
import Slogan from './Slogan';
import { Button, Col, Row } from 'react-bootstrap'

import animationData from './lottie/man_confused.json'
import cartData from './lottie/cart.json'

import logo from '../assets/cart_logo_trans.png'
import LottieControl from './LottieControl';

class Home extends Component {

    render() {
        return (
            <div className='home-area'>

                <Row>
                    <Col md={2} xsHidden></Col>
                    <Col md={4} xs={12}>
                        <div className="home-lottie-image">
                            {/* <GeoChart data={[["United States", 44], ["Germany", 23], ["Brazil", 22]]} /> */}
                            <LottieControl animationData={animationData} height={400} width={400} />
                        </div>
                    </Col>
                    <Col md={6} xs={12}>
                        <div className="home-col-right">
                        {/* <img src={logo} className='header-cart-image' /> */}
                        <h1 className='home-header-text'>cARt
                            {/* <LottieControl animationData={cartData} height={400} width={400} /> */}
                        </h1>
                        <Slogan />
                        <div className='home-main-buttons'>
                            <a href="/consumers">
                                <Button
                                    className='report-button'
                                    bsStyle="info"
                                    bsSize="large">
                                    Consumers
                    </Button>
                            </a>
                            &nbsp;
                <a href="/merchants">
                                <Button
                                    className='report-button'
                                    bsStyle="info"
                                    bsSize="large">
                                    Merchants
                    </Button>
                            </a>
</div>
                        </div>
                    </Col>

                </Row>
            </div>
        );
    }
}

export default Home;
