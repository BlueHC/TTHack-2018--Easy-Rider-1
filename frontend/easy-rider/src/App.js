import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import logo from './logo.svg';
import { loadOccupancyData } from './adapter/Occupancy.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Auslastung</h1>
        <Occupancy></Occupancy>
      </div>
    );
  }
}

class Occupancy extends Component {
  render() {
   var data = loadOccupancyData();
  
    const columns = [{
      Header: 'Linie',
      accessor: 'line' // String-based value accessors!
    }, {
      Header: 'Zeit',
      accessor: 'time',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: 'Auslastung',
      accessor: 'occupancy',
    }]
    return (
      <div>
      <div className="row">
      <div className="col-3">
      </div>
      <div className="col-6">
      <ReactTable
      data={data}
      columns={columns}/>
      </div>
      <div className="col-3">
      </div>
      </div>
    <div>
    </div>
    </div>);
    
  }
}
  


export default App;
