import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import List from './List'


export default class Component2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[[],[]]
        }      
    }
    componentWillMount(){
        let _this = this;
        console.log("will mount soon");
        fetch('http://easyriderbackend.eu-gb.mybluemix.net/rides')
        .then(function(response) {
            return response.json();
        })
        .then(function(array) {
            console.log(array);
            for (let s of array.response) {
                console.log("Data: " + JSON.stringify(s));
            }
                          
            _this.setState({
                data: array.response//response.json()
            });

        });

    }


    render() {
        let _this = this;
        const columns = [{
            Header: 'Transportdienstleister',
            accessor: 'partner' // String-based value accessors!
          },{
            Header: 'Fahrzeug',
            accessor: 'vehicle' // String-based value accessors!
          },{
            Header: 'Startzeit',
            accessor: 'from_time' // String-based value accessors!
          },{
            Header: 'Endzeit',
            accessor: 'to_time' // String-based value accessors!
          },{
            Header: 'Einstieg',
            accessor: 'from_loc' // String-based value accessors!
          },{
            Header: 'Ausstieg',
            accessor: 'to_loc' // String-based value accessors!
          },{
            Header: 'Status',
            accessor: 'status' // String-based value accessors!
          }];
          
          var data;
          return (
              <div>
                  <br/>
                  <h3 style={{textAlign: 'center'}}>Fahrtübersicht</h3>
                  <br/>

                  <div class="row">
                  <div class="col-2"></div>
                  <div class="col-8">
                      <ReactTable
                        data={_this.state.data}
                        columns={columns}
                       />
          </div>
                  <div class="col-2"></div>
          </div>
          </div>)
    }
}
