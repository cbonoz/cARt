import React, { Component } from "react";
import logo from "./assets/cart_horizontal.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from 'react-bootstrap'

import Home from "./components/Home";
import { NotificationContainer, NotificationManager } from 'react-notifications';

import "./App.css";
import 'react-notifications/lib/notifications.css';
import ConsumerView from "./components/ConsumerView";
import GoogleMaps from "./components/GoogleMaps";

import Chartkick from "chartkick";
import Chart from "chart.js";

Chartkick.addAdapter(Chart);

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <div className="nav-area">
              <Navbar collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                    <img src={logo} className="App-logo" alt="logo" href="/" />
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav>
                    <NavItem eventKey={0} href="/">
                      Home
                    </NavItem>
                  </Nav>
                  <Nav pullRight>
                    <NavItem eventKey={1} href="/shop">
                      Discoveries
                    </NavItem>
                    <NavItem eventKey={2} href="/merchants">
                      For&nbsp;Merchants
                    </NavItem>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </header>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/shop" component={ConsumerView} />
            <Route path="/merchants" component={GoogleMaps} />
          </div>
          <NotificationContainer />
        </div>
      </Router>
    );
  }
}

export default App;
