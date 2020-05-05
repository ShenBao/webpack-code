'use strict';

import React from 'react';
import {add} from './math';

export default class Com1 extends React.Component {
  render() {
    console.log(add('hello', 'webpack'));
    return <div>Com1</div>;
  }
}
