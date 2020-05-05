'use strict';

import React from 'react';
import {add} from './math';

export default class Com2 extends React.Component {
  render() {
    console.log(add(15, 20));
    return <div>Com2</div>;
  }
}
