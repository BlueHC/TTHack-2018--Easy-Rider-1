var express = require('express');
var rides = require('../controller/rides/rides.js');

var router = express.Router();
router.post('/ride', function(req, res) {
  rides.Ride(req, res)
});  

router.get('/rides', function(req, res){
  rides.getRides(res);
})
module.exports = router;
