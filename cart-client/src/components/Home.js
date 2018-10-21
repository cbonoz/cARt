import React, { Component } from 'react';
import Slogan from './Slogan';
import { Button, Grid, Col, Row } from 'react-bootstrap'
import animationData from './lottie/man_pay.json'

import logo from '../assets/cart_horizontal.png'
import LottieControl from './LottieControl';

class Home extends Component {

    render() {
        return (
            <div className='home-area'>

                <Row>
                    <Col md={2} xsHidden></Col>
                    <Col md={4} xs={12}>
                        <div className="home-lottie-image">
                            <LottieControl animationData={animationData} height={400} width={400}/>
</div>
                    </Col>
                    <Col md={6} xs={12}>

                        {/* <img src={logo}/> */}
                        <h1 className='home-header-text'>cARt</h1>
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
                    </Col>

                </Row>
            </div>
        );
    }
}

export default Home;
