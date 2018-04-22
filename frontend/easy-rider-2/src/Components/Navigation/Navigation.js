import React, { Component } from 'react';
import { Route } from 'react-router-dom'

export default class Navigation extends Component {
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/start">Easy Rider</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {
                            <Route path="/component1" children={( {match} ) => (<a className={match ? 'nav-link my-lg-0 active' : 'nav-link my-lg-0'} href="/component1">Component1</a>)}/>
                        }
                        {
                            <Route path="/component2" children={( {match} ) => (<a className={match ? 'nav-link my-lg-0 active' : 'nav-link my-lg-0'} href="/component2">Component2</a>)}/>
                        }
                       
                    </ul>
                </div>
            </nav>
        );
    }
}
