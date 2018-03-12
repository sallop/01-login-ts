// import React, { Component } from 'react';
import * as React from 'react';
// import History from 'history';
import { History } from 'history';
import Auth from './Auth/Auth';

import { Navbar, Button } from 'react-bootstrap';
import './App.css';

interface Props {
  history: History;
  auth: Auth;
}

interface State {
}

class App extends React.Component<Props, State> {
  // constructor(){
  constructor(props: Props, state: State) { 
    super(props);
    this.goTo = this.goTo.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }
  goTo(route: string): void {
    this.props.history.replace(`/${route}`);
  }

  login(): void {
    this.props.auth.login();
  }

  logout(): void {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    // onClick={this.goTo.bind(this, 'home')}
    // onClick={this.login.bind(this)}
    // onClick={this.logout.bind(this)}
    return (
      <div>
        <Navbar fluid={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button 
              bsStyle="primary"
              className="btn-margin"
              // onClick={this.goTo('home')}
            >
              Home
            </Button>
            {
              !isAuthenticated() && (
                  <Button
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    // onClick={this.login()}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    id="qsLogoutBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    // onClick={this.logout()}
                  >
                    Log Out
                  </Button>
                )
            }
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

export default App;
