const { Pool, Client } = require('pg')
const connectionString = 'postgres://admin:JJWPSKVOSJJSWZTF@sl-eu-lon-2-portal.1.dblayer.com:25959/compose'
const pool = new Pool({
    connectionString: connectionString,
  })

  function getRide(resp){
    const client = new Client({
      connectionString: connectionString,
    });
    client.connect();
  const queryText = `select h.user_id, h.first_name, h.last_name, h.partner, h.vehicle , h.from_time, h.to_time, h.from_loc, h.to_loc, h.status from trans_history h where h.user_id = 1;`
  const values = [];
  client.query(queryText, values, (err, res) => {
      if (err) {
        console.log(err.stack)
        resp.status(400).send({
          message: "Error"
        })
      } else {
        resp.status(200).send({
          response: res.rows
        })
      }
    })
  }

 function addRide (ride){
    const client = new Client({
        connectionString: connectionString,
      });
      client.connect();
    const queryText = `INSERT INTO transactions (device_uuid, station, longitude, latitude, time, medium_id )VALUES ($1, $2, $3, $4, now(), $5);`
    const values = [ride.userID, ride.station, ride.longitude, ride.latitude, ride.mediumID];
    client.query(queryText, values, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows[0])
          // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
        }
      })
            
    return {
        status: 200,
        message: "Ride written to database"
    }
}
module.exports.addRide = addRide;
module.exports.getRide = getRide;