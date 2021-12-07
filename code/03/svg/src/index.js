'use strict';

import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';

import logo from './logo.svg';

console.log(logo);

class App extends React.Component {
  render () {
    console.log('ShenBao React App');
    return (
      <div className="app">
        ShenBao React App
        <hr/>
        <img width={200} src={logo} />
        <div dangerouslySetInnerHTML={{ __html: logo }}></div>
      </div>
    );
  }
}

ReactDOM.render (<App />, document.getElementById ('root'));
