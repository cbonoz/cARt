
import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap'
import { getItems, getFuture } from './../helper/api'
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import cx from 'classnames'

class ConsumerView extends Component {

    state = {
        items: [],
        itemData: [],
        currentItem: null,
        currentIndex: null
    }

    constructor(props) {
        super(props);
        this.renderItems = this.renderItems.bind(this);
    }

    renderItems() {
        const self = this
        const { currentIndex } = self.state
        getItems().then(res => {
            const items = res.data
            console.log(items)
            const numItems = items.length
            self.setState({ items })
            self.renderData((currentIndex + 1) % numItems)
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
            const modifiedData = {}
            balances.map(entry => {
                entry['balance']['amount'] = entry['balance']['amount'] - currentItem.price
                modifiedData[entry['date']] = parseFloat(parseFloat(entry['balance']['amount']).toFixed(2))
            })
            console.log(modifiedData)
            self.setState({ currentIndex, currentItem, itemData: modifiedData })
        }).catch(err => {
            console.error('error', err)
        })
    }

    componentDidMount() {
        this.renderItems()
        setInterval(this.renderItems, 5000)
    }

    render() {
        const { itemData, items, currentItem, currentIndex } = this.state
        return (
            <div className='consumer-view'>

                <Row>

                    <Col xs={12} md={3}>
                        <ListGroup>
                            <ListGroupItem header="Your Recent Items" bsStyle='info'/>
                            <ListGroupItem>
                            {!items && <p>No recent items Recorded</p>}
                            {items && items.map((item, i) => {
                                const cName = cx({ 'gray': currentIndex === i, 'list-item-row': true })
                                return <div
                                    className={cName}
                                    onClick={() => this.renderData(i)}
                                    key={i}>
                                    {item.name}</div>
                            })}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>

                    <Col xs={12} md={9}>
                        {currentItem && <div>
                            <ListGroupItem header={currentItem.name + " - Projected Balance"}/>
                            <ListGroupItem>
                            <div className='chart-area'>
                                {itemData && <LineChart
                                    label="Predicted Balance"
                                    prefix="$"
                                    legend={true}
                                    data={itemData}
                                    width="800px"
                                    height="600px" />}
                            </div>
</ListGroupItem>
                        </div>}

                    </Col>

                </Row>


            </div>
        );
    }
}

export default ConsumerView;
