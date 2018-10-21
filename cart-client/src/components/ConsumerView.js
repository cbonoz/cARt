
import React, { Component } from 'react';
import {ListGroup, ListGroupItem, Row, Col} from 'react-bootstrap'
import { getItems, getFuture } from './../helper/api'

class ConsumerView extends Component {

    state = {
        items: [],
        itemData: [],
        currentItem: null
    }

    renderItems() {
        const self = this
        getItems().then(items => {
            self.setState({ items })
        }).catch(err => {
            console.error('error', err)
        })
    }

    renderData(item) {
        const self = this
        getFuture().then(itemData => {
            self.setState({ item, itemData })
        }).catch(err => {
            console.error('error', err)
        })
    }

    componentDidMount() {
        this.renderItems()
        setInterval(this.renderItems, 10000)
    }

    render() {
        const { itemData, items, currentItem } = this.state
        return (
            <div>

                <Row>

                    <Col xs={12} md={3}>
                        <ListGroup>
                            {items && items.map((item ,i) => {
                                return <ListGroupItem onClick={(item) => this.renderData(item)} key={i}>
                                   {item.name} 
                                </ListGroupItem>
                            })}
                        </ListGroup>
                    </Col>

                    <Col xs={12} md={9}>
                            {currentItem && <div>
                                {JSON.stringify(currentItem)}
                                <div className='chart-area'>
                                {/* TODO: chart  */}
                                </div>
                            </div>}
                            
                    </Col>

                    </Row>


            </div>
        );
    }
}

export default ConsumerView;