import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Occupancy from './Components/Occupancy/OccupancyComponent';
import Component2 from './Components/Component2/Overview';
import Navigation from './Components/Navigation/Navigation';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Navigation/>

        <Route path='/occupancy' component={Occupancy}/>

        <Route path='/component2' component={Component2}/>

      </div>
    );
  }
}

export default App;
