var ridesDB = require('../../database/rides/rides.js'); 

function Ride (req, res) {
    if (!req.body.userID){
        res.status(400).send({
            message: "UserID missing"
        });
    }else if (!req.body.station || !req.body.longitude || !req.body.latitude){
        res.status(400).send({
            message: "Location Data Missing"
        });
    }else if (!req.body.time){
        res.status(400).send({
            message: "Time information missing"
        });
    }else if (!req.body.mode){
        res.status(400).send({
            message: "Transportation mode missing"
        });
    }else if (!req.body.transportID){
        res.status(400).send({
            message: "Transportation ID missing"
        });
    }else {
        var result = ridesDB.addRide(req.body);
        res.status(200).send(result);
    }
}
module.exports.Ride = Ride;