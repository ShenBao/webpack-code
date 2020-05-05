import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return <div className="app">ShenBao React App</div>;
  }
}

// const App = () => (
//   <div className="app">
//     <span>ShenBao React App</span>
//   </div>
// );

ReactDOM.render(<App />, document.getElementById('root'));
