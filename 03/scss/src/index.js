'use strict';

import './style.scss';

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render () {
    console.log('ShenBao React App');
    return (
      <div className="app">
        <span>
          ShenBao React App
        </span>
      </div>
    );
  }
}

ReactDOM.render (<App />, document.getElementById ('root'));
