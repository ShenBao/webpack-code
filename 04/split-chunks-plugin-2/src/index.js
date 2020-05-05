'use strict';

import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Com1 from './com-1';
import Com2 from './com-2';

class App extends React.Component {
  render () {
    console.log('ShenBao React App');
    return (
      <div className="app">
        ShenBao React App
        <Com1 />
        <Com2 />
      </div>
    );
  }
}

ReactDOM.render (<App />, document.getElementById ('root'));
