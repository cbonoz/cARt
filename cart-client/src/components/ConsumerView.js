
import React, { Component } from 'react';
import { ListGroup, Button, ListGroupItem, Row, Col } from 'react-bootstrap'
import { getItems, getFuture } from './../helper/api'
import ReactChartkick, { LineChart, AreaChart, PieChart } from 'react-chartkick'
import animationData from './lottie/success.json'
import LottieControl from './LottieControl'
import cx from 'classnames'

class ConsumerView extends Component {

    state = {
        items: [],
        itemData: [],
        currentItem: null,
        currentIndex: null,
        hasNegative: false,
        showItems: false
    }

    constructor(props) {
        super(props);
        this.renderItems = this.renderItems.bind(this);
        this.showItems = this.showItems.bind(this);
    }

    renderItems() {
        const self = this
        const { currentIndex } = self.state
        getItems().then(res => {
            const items = res.data.reverse() // reverse order from addition
            console.log(items)
            const numItems = items.length
            self.setState({ items })
            if (!currentIndex) {
                self.renderData(0)
            }
            // self.renderData((currentIndex + 1) % numItems)
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
            let hasNegative = false
            balances.map(entry => {
                entry['balance']['amount'] = entry['balance']['amount'] - currentItem.price
                const newValue = parseFloat(parseFloat(entry['balance']['amount']).toFixed(2))
                modifiedData[entry['date']] = newValue
                if (newValue < 0) {
                    hasNegative = true
                }
            })
            console.log(modifiedData)
            self.setState({ currentIndex, hasNegative, currentItem, itemData: modifiedData })
        }).catch(err => {
            console.error('error', err)
        })
    }

    showItems() {

        this.setState( { showItems: true})
    }

    componentDidMount() {
        setTimeout(this.showItems, 1000)


        this.renderItems()
        setInterval(this.renderItems, 5000)
    }

    render() {
        const { showItems, itemData, items, currentItem, hasNegative, currentIndex } = this.state

        const chartColor = hasNegative ? "#ff0000" : "#00ff00"
        const buyStyle = hasNegative ? "warning" : "success"

        return (
            <div>
            {!showItems &&  <div className='centered'>
                <h2>Loading your Product Discoveries</h2>
                <LottieControl runOnce={true} animationData={animationData} height={400} width={400}/>
            </div>
                }
            {showItems && <div className='consumer-view'>

                <Row>

                    <Col xs={12} md={3}>
                        <ListGroup>
                        <ListGroupItem header="Your Discoveries" bsStyle='info'>{new Date().toLocaleDateString()}</ListGroupItem>
                            <ListGroupItem>
                            {items === null || (items.length === 0) && <h3>No recent items Recorded,<br/>Why not go out and explore?</h3>}
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
                            <ListGroupItem header={"Your account after buying " + currentItem.name}>One month simulation</ListGroupItem>
                            <ListGroupItem>
                            <div className='chart-area'>
                                {/* <p>{currentItem.name}</p> */}
                                {itemData && <AreaChart
                                    label="Predicted Balance"
                                    colors={[chartColor]}
                                    prefix="$"
                                    legend={true}
                                    data={itemData}
                                    width="800px"
                                    height="600px" />}
                            </div>

                            <div>
                                {hasNegative && <Button className="chart-button" bsSize="large" bsStyle="danger">Request Money</Button>}
                                {!hasNegative && <Button className="chart-button" bsSize="large" bsStyle="success">Buy</Button>}
                                <Button className="chart-button" bsSize="large" bsStyle="info">Lookup Product</Button>
                            </div>
</ListGroupItem>
                        </div>}

                    </Col>

                </Row>


            </div>}
            </div>
        );
    }
}

export default ConsumerView;
