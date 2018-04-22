var occupancyDB = require('../../database/occupancy/occupancy.js'); 

function getOccupancy (req, res) {
    console.log("GetOccupancy");
    var mediumID = req.query.mediumID;
    if (!mediumID){
        res.status(400).send({
            message: "No Medium ID"
        });
    }else {
        var result = occupancyDB.getOccupancy(mediumID, res);
    }
}

function setOccupancy (req, res) {
    var mediumID = req.query.mediumID;
    if (!mediumID){
        res.status(400).send({
            message: "No Medium ID"
        });
    }if (!req.body.amount){
        res.status(400).send({
            message: "amount missing"
        });
    }else if ( !req.body.longitude || !req.body.latitude){
        res.status(400).send({
            message: "Location Data Missing"
        });
    }else {
        var result = occupancyDB.setOccupancy(mediumID, req.body);
        res.status(200).send(result);
    }
}
module.exports.getOccupancy = getOccupancy;
module.exports.setOccupancy = setOccupancy;