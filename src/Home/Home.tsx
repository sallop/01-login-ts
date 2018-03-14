// import React, { Component } from 'react';
import * as React from 'react';
import Auth from '../Auth/Auth';

interface Props {
  auth: Auth;
}

interface State {
}

class Home extends React.Component<Props, State> {
  constructor(props: Props, state: State) { 
    super(props);
    this.login = this.login.bind(this);
  }

  login(): void {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <h4>
                You are logged in!
              </h4>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => { this.login(); }}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
