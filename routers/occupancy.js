var express = require('express');
var occupancy = require('../controller/occupancy/occupancy.js');

var router = express.Router();
router.post('/occupancy', function(req, res) {
    occupancy.setOccupancy(req, res);
});  

router.get('/occupancy', function(req, res) {
    occupancy.getOccupancy(req, res);
});  
module.exports = router;
