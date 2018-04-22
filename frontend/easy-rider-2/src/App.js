import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Component1 from './Components/Component1/Component1';
import Component2 from './Components/Component2/Overview';
import Navigation from './Components/Navigation/Navigation';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Navigation/>

        <Route path='/component1' component={Component1}/>

        <Route path='/component2' component={Component2}/>

      </div>
    );
  }
}

export default App;
