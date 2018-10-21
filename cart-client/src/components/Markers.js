import React, { Component } from 'react';
import animationData from './lottie/bouncy_mapmaker.json'
import LottieControl from './LottieControl';

export default class Markers extends Component {

    render() {
        return (
            < LottieControl
            animationData = { animationData }
            height = { 30 }
            width = { 30 }
            />
        )
    }
}
