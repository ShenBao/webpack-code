'use strict';

import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render () {
    console.log('List Page');
    return (
      <div className="app">
        List Page
      </div>
    );
  }
}

ReactDOM.render (<App />, document.getElementById ('root'));
