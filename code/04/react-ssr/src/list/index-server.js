'use strict';

// import React from 'react';
// import largeNumber from 'large-number';
// import logo from './images/abc.png';
// import './list.less';
const React = require('react');
const largeNumber = require('large-number');
const logo = require('./images/abc.png');
const s = require('./list.less');

class Search extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      Text: null,
    };
  }

  loadComponent() {
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default,
      });
    });
  }

  render() {
    const {Text} = this.state;
    const addResult = largeNumber('999', '1');
    return (
      <div className="app">
        <p>ShenBao React App</p>
        <p>{addResult}</p>
        <div>{Text ? <Text /> : null}</div>
        <div>
          <img src={logo} onClick={this.loadComponent.bind(this)} />
        </div>
      </div>
    );
  }
}

module.exports = <Search />;
