import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import List from './List'

export default class Component2 extends Component {
    render() {
        return(
            <div>        
                <div>
                    <br />
                    <div className="container">
                        <div className="row">
                            <div className="col-s">
                            </div>
                            <div className="col-xl">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col text-left">
                                            </div>
                                            <div className="col text-center">
                                                ListComponent}
                                            </div>
                                            <div className="col text-right">
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <Route path='/component2/list' component={List}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-s">
                            </div>
                        </div>
                    </div>  
                </div>  
            </div>
        );
    }
}
