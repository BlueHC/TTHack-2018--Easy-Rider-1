import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

export default class Occupancy extends Component {
    constructor(props) {
        super(props); 
        this.state = {occupancy: 100};
        
        this.fetchData();
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData() {
        console.log("Fetching data.. ")
        fetch('http://easyriderbackend.eu-gb.mybluemix.net/occupancy?mediumID=1')
            .then(function(response) {
                console.log(response)
                return response.json()
            }).then((json) => {
                console.log('parsed json', json)
                var amount = json.result[0].amount
                console.log("OCCUPANCY: " + amount)
                this.setState({
                    occupancy: amount
                });
                
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            })
        
    }

    getIconClass(amount) {
        if(amount > 72) return "text-success"
        if(amount > 35) return "text-warning"
        return "text-danger"
    }
   
    render() {
        return(
            <div>
                <h1 style={{textAlign: "center", marginTop: "50px"}}>Aktuelle Belegung</h1>
                <h4 style={{textAlign: "center", marginTop: "5px"}}>Fahrzeug: <b>Bus 1</b></h4>
                <div style={{margin: "auto", width: "219.42px", marginTop: "25px"}}>
                    <FontAwesome name='bus' className={this.getIconClass(this.state.occupancy)} style={{textAlign: "center", fontSize: "256px", }}/>
                    <h6 style={{textAlign: "center", marginTop: "15px"}}>Geschätzte freie Plätze: <b>{this.state.occupancy  + "%" }</b></h6> 
                </div>
                <div style={{margin: "auto", width: "150px", marginTop: "25px"}}>
                    <button type="button" className="btn btn-secondary" style={{margin: "auto", width: "150px"}} onClick={this.fetchData}>Aktualisieren</button>
                </div>
            </div>
        );
    }
}
