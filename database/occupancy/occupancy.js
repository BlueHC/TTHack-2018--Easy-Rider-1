const { Pool, Client } = require('pg')
const connectionString = 'postgres://admin:JJWPSKVOSJJSWZTF@sl-eu-lon-2-portal.1.dblayer.com:25959/compose'
const pool = new Pool({
    connectionString: connectionString,
  })

 function getOccupancy (mediumID, resp){
     var result = 0;
    const client = new Client({
        connectionString: connectionString,
      });
      client.connect();
    const queryText = `select fl.medium_id, fl.time , fl.amount, (100 - fl.amount::INTEGER ) as occupacity
    from filling_levels fl
     LEFT OUTER JOIN mediums m2 ON fl.medium_id = m2.medium_id
    where fl.filling_level_id in (
    select max(filling_level_id)
    from filling_levels
    where status =1 and medium_id is not null
    group by medium_id);`
    const values = [];
    client.query(queryText, values, (err, res) => {
      result = res;
        if (err) {
          console.log(err.stack)
          resp.status(400).send("Error");
        } else {
          resp.status(200).send({
            message: "OK",
            result: res.rows
          })
        }
      })

}

function setOccupancy (mediumID, body){
    const client = new Client({
        connectionString: connectionString,
      });
      client.connect();
    const queryText = `INSERT INTO filling_levels (medium_id, longitude, latitude, time, amount)
    VALUES ($1, $2, $3, now(), $4 );`
    const values = [mediumID, body.longitude, body.latitude, body.amount];
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

module.exports.setOccupancy = setOccupancy;
module.exports.getOccupancy = getOccupancy;
