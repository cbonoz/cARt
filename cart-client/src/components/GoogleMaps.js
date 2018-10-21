import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Markers from './Markers';
import { getItems } from '../helper/api'
import { Modal, Popover, OverlayTrigger, Button, ListGroup, ListGroupItem, Tooltip} from 'react-bootstrap';

class SimpleMap extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      itemMarkers: [],
      show: false
    }
  }

  static defaultProps = {
    center: {
      lat: 36.1216611,
      lng: -115.1679618
    },
    zoom: 12
  };

  handleClose() {
    this.setState({
      show: false
    });
  }

  handleShow(key) {
    console.log(Math.random() *100 + 20)
    this.state.itemMarkers[key].dwellTime = Math.floor(Math.random() * 100 + 20)
    this.setState({
      show: true,
      chosenItem: this.state.itemMarkers[key]
    });
  }

  componentDidMount() {
    const self = this
    getItems().then(res => {
      const itemMarkers = res.data
      self.setState({
        itemMarkers
      })
    })
  }

  render() {
    const { itemMarkers, show, chosenItem } = this.state

    const converted = chosenItem && chosenItem.converted


    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <ListGroupItem header="Impressions"/>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAiFR99z-npUDYJE_w0MJGKO5Z5fkhi3Yc" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          heatmapLibrary={true}
          heatmap={this.state.itemMarkers}
          onChildClick={this.handleShow}
        >

          {itemMarkers.map((marker, i) => <Markers
            title={marker.name}
            id={marker.id}
            lat={marker.lat}
            lng={marker.lng}
          />)}
        </GoogleMapReact>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Item Impression</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Item: {chosenItem && chosenItem.name}</h3>
            <hr/>
            <p>
              Price: ${chosenItem && chosenItem.price}
            </p>
            <p>
              Address: {chosenItem && chosenItem.address}
            </p>
            <p>
              Seconds Engaged: <b>{chosenItem && chosenItem.dwellTime}</b>
            </p>

            <h4>-</h4>

            <p>
              Converted: <b>{chosenItem && chosenItem.converted ? "Yes" : "No"}</b>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="info" onClick={this.viewAnalytics}>View Analytics</Button>
            <Button bsStyle="warning" onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

export default SimpleMap;
