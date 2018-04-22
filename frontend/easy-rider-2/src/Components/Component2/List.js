import React, { Component } from 'react';
import { Route } from 'react-router-dom';


export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list_items: [[], [], [], [], []]
        };
    }


    render() {
        return(
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">1</th>
                        <th scope="col">2</th>
                        <th scope="col">3</th>
                        <th scope="col">4</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.list_items.map((row, i) =>
                    
                        <tr>
                            {this.state.list_items.map((col, j) =>
                                <td key={j}>{col[i]}</td>
                            )}
                        </tr>
                    
                    )}
                </tbody>
            </table>
        );
    }
}