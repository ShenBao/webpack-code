'use strict';

import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';

async function creatElem() {
  const {default: _} = await import(/* webpackChunkName:"lodash" */ 'lodash');
  const element = document.createElement('div');
  element.innerHTML = _.join(['hello', 'webpack'], '-');
  return element;
}

class App extends React.Component {
  state = {
    elem: null,
  };

  handleClick = () => {
    // 动态加载
    import('./math').then((math) => {
      console.log(math.add(16, 26));
    });
  };

  refDiv = React.createRef();

  creatElem = async () => {
    const elem = await creatElem();
    console.log('elem: ', elem);
    console.log('refDiv: ', this.refDiv.current);
    this.refDiv.current.appendChild(elem);
  };

  render() {
    console.log('ShenBao React App');
    return (
      <div className="app">
        ShenBao React App
        <hr />
        <button onClick={this.handleClick}>add</button>
        <button onClick={this.creatElem}>creatElem</button>
        <div ref={this.refDiv}></div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
