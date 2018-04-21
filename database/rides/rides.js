const { Pool, Client } = require('pg')
const connectionString = 'postgres://admin:JJWPSKVOSJJSWZTF@sl-eu-lon-2-portal.1.dblayer.com:25959/compose'
const pool = new Pool({
    connectionString: connectionString,
  })

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
