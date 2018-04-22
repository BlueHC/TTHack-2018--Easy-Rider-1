  var request = require('request');

var loadOccupancyData =  function (){
request('http://easyriderbackend.eu-gb.mybluemix.net/occupancy?mediumID=0', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
}

export {loadOccupancyData};