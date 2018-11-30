import React, { Component } from 'react';
import Hello from './components/Hello';
import Auth from './components/auth/Auth'

class App extends Component {
  render() {
    return (
      <div>
        <Hello />
        <Auth />
      </div>
    );
  }
}

export default App;
