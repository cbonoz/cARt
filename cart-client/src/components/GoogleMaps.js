import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Markers from './Markers';
// const AnyReactComponent = ({ text }) => (
//   <div>
//     {text}
//   </div>
// );
  const mockData = [{
    id: '1',
    lat: "36.1216611" ,
    lng: "-115.1679618"
  }]


class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 36.1216611,
      lng: -115.1679618
    },
    zoom: 11
  };
  componentDidMount() {

  }

  _onChildClick = (key, childProps) => {
    console.log('childprops,', childProps)
    const markerId = childProps.marker.get('id');
    const index = this.props.markers.findIndex(m => m.get('id') === markerId);
    if (this.props.onChildClick) {
      this.props.onChildClick(index);
    }
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAiFR99z-npUDYJE_w0MJGKO5Z5fkhi3Yc" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onChildClick={this._onChildClick}
        >

        {mockData.map((marker,index) => <Markers id={marker.id} lat = {marker.lat} lng = {marker.lng} /> )}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
