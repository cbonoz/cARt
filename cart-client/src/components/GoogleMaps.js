import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Markers from './Markers';

import { getItems } from '../helper/api'

class SimpleMap extends Component {

  state = {
    itemMarkers: []
  }

  static defaultProps = {
    center: {
      lat: 36.1216611,
      lng: -115.1679618
    },
    zoom: 12
  };

  componentDidMount() {
    const self = this
    getItems().then(res => {
      const itemMarkers = res.data
      self.setState( {
        itemMarkers
      })
    })
  }

  render() {
    const { itemMarkers } = this.state

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAiFR99z-npUDYJE_w0MJGKO5Z5fkhi3Yc" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          // heatmapLibrary={true}
          // heatmap={mockData}
        >

        {itemMarkers.map((marker, i) => <Markers id={marker.id} lat = {marker.lat} lng = {marker.lng} /> )}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
