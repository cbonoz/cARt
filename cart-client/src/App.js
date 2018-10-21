import React, { Component } from "react";
import logo from "./assets/build_sage_trans_white.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Nav, Navbar, NavItem} from 'react-bootstrap'

import Home from "./components/Home";
import Search from "./components/Search";
import ReportForm from "./components/ReportForm";
import {NotificationContainer, NotificationManager} from 'react-notifications';

import "./App.css";
import 'react-notifications/lib/notifications.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <div className="nav-area">
            <Navbar inverse collapseOnSelect>
  <Navbar.Header>
    <Navbar.Brand>
        <img src={logo} className="App-logo" alt="logo" href="/"/>
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
      <NavItem eventKey={1} href="/search">
        Search
      </NavItem>
      <NavItem eventKey={2} href="/report">
        New Report
      </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>
            </div>
          </header>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/report" component={ReportForm} />
          </div>
          <NotificationContainer/>
        </div>
      </Router>
    );
  }
}

export default App;
