var ridesDB = require('../../database/rides/rides.js'); 

function getRides(res){
    ridesDB.getRide(res);
}

function Ride (req, res) {
    if (!req.body.userID){
        res.status(400).send({
            message: "UserID missing"
        });
    }else if (!req.body.station || !req.body.longitude || !req.body.latitude){
        res.status(400).send({
            message: "Location Data Missing"
        });
    }else if (!req.body.mediumID){
        res.status(400).send({
            message: "Transportation ID missing"
        });
    }else {
        var result = ridesDB.addRide(req.body);
        res.status(200).send(result);
    }
}
module.exports.Ride = Ride;
module.exports.getRides = getRides;