// import React, { Component } from 'react';
import * as React from 'react';
import loading from './loading.svg';

interface Props {
}

interface State {
}

class Callback extends React.Component<Props, State> {
  render() {
    // https://github.com/Microsoft/TypeScript/issues/16542
    const style: React.CSSProperties = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
    };

    return (
      <div style={style}>
        <img src={loading} alt="loading"/>
      </div>
    );
  }
}

export default Callback;
