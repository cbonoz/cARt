import React, { Component } from 'react';
import Slogan from './Slogan';
import { Button } from 'react-bootstrap'

import logo from '../assets/build_sage_trans.png'

class Home extends Component {

    render() {
        return (
            <div className='home-area'>
                <img src={logo} className='home-main-logo'/>
                <Slogan />
                <div className='home-main-buttons'>

                <a href="/search">
                    <Button
                        className='report-button'
                        bsStyle="info"
                        bsSize="large">
                        Search Lessons
                    </Button>
                </a>
                &nbsp;
                <a href="/report">
                    <Button
                        className='report-button'
                        bsStyle="info"
                        bsSize="large">
                        New Report
                    </Button>
                </a>
                </div>
            </div>
        );
    }
}

export default Home;