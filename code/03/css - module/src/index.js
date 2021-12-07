'use strict';

import style from './style.css';

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render () {
    console.log('ShenBao React App');
    return (
      <div className={style.app}>
        ShenBao React App
      </div>
    );
  }
}

ReactDOM.render (<App />, document.getElementById ('root'));
