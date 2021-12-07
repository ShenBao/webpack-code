'use strict';

import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';

import abcImg from './assets/abc.png';

class App extends React.Component {
  render () {
    console.log('ShenBao React App');
    return (
      <div className="app">
        ShenBao React App
        <hr/>
        <img src={abcImg} />
      </div>
    );
  }
}

ReactDOM.render (<App />, document.getElementById ('root'));
