var occupancyDB = require('../../database/occupancy/occupancy.js'); 

function getOccupancy (req, res) {
    var mediumID = req.query.mediumID;
    if (!mediumID){
        res.status(400).send({
            message: "No Medium ID"
        });
    }else {
        var result = occupancyDB.getOccupancy(mediumID);
        res.status(200).send(result);
    }
}

function setOccupancy (req, res) {
    var mediumID = req.query.mediumID;
    if (!mediumID){
        res.status(400).send({
            message: "No Medium ID"
        });
    }else {
        var result = occupancyDB.setOccupancy(mediumID, req.body);
        res.status(200).send(result);
    }
}
module.exports.getOccupancy = getOccupancy;
module.exports.setOccupancy = setOccupancy;