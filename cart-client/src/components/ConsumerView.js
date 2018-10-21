
import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap'
import { getItems, getFuture } from './../helper/api'
import cx from 'classnames'

class ConsumerView extends Component {

    state = {
        items: [],
        itemData: [],
        currentItem: null,
        currentIndex: null 
    }

    constructor( props ){
        super( props );
        this.renderItems = this.renderItems.bind(this);
      }

    renderItems() {
        const self = this
        getItems().then(res => {
            const items = res.data
            console.log(items)
            self.setState({ items })
        }).catch(err => {
            console.error('error', err)
        })
    }

    renderData(currentIndex) {
        const self = this
        const currentItem = self.state.items[currentIndex]
        getFuture().then(res => {
            const itemData = res.data
            const balances = itemData['account'][0]['balances']
            console.log(itemData)
            const modifiedData = balances.map(entry => {
                entry['balance']['amount'] = entry['balance']['amount']  - currentItem.price
                return {
                    x: entry['date'],
                    y: parseFloat(parseFloat(entry['balance']['amount']).toFixed(2))
                }
            })
            console.log(modifiedData)
            self.setState({ currentIndex, currentItem, itemData: modifiedData })
        }).catch(err => {
            console.error('error', err)
        })
    }

    componentDidMount() {
        this.renderItems()
        setInterval(this.renderItems, 10000)
    }

    render() {
        const { itemData, items, currentItem, currentIndex } = this.state
        return (
            <div>

                <Row>

                    <Col xs={12} md={3}>
                        <ListGroup>
                            <h2>Your Recent Items</h2>
                            {!items && <p>No recent items Recorded</p>}
                            {items && items.map((item, i) => {
                                return <ListGroupItem 
                                className={{cx: {'gray': currentIndex === i, 'list-spacing': true}}}
                                onClick={() => this.renderData(i)}
                                 key={i}>
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