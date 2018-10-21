import React from 'react'
import Lottie from 'react-lottie';
import * as animationData from './lottie/man_pay.json'
// Example <LottieControl animationData={animationData}/>

export default class LottieControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isStopped: false, isPaused: false};
  }

  render() {
    const { animationData, height, width, runOnce } = this.props
    const {isPaused, isStopped} = this.state

    const buttonStyle = {
      display: 'block',
      margin: '10px auto'
    };

    const loop = runOnce === false || runOnce === undefined

    const defaultOptions = {
      loop: loop,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return <div>
      <Lottie options={defaultOptions}
              height={height}
              width={width}
              isStopped={isStopped}
              isPaused={isPaused}/>
      {/* <button style={buttonStyle} onClick={() => this.setState({isStopped: true})}>stop</button>
      <button style={buttonStyle} onClick={() => this.setState({isStopped: false})}>play</button>
      <button style={buttonStyle} onClick={() => this.setState({isPaused: !this.state.isPaused})}>pause</button> */}
    </div>
  }
}
