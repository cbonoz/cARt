import React, { Component } from 'react';
import animationData from './lottie/bouncy_mapmaker.json'
import LottieControl from './LottieControl';

export default class Markers extends Component {

    render() {
        return (
            < LottieControl
            animationData = { animationData }
            height = { 20 }
            width = { 20 }
            lat = { 36.1216611 }
            lng = { -115.1679618 }
            />
        )
    }
}
