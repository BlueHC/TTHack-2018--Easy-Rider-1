const { Pool, Client } = require('pg')
const connectionString = 'postgres://admin:JJWPSKVOSJJSWZTF@sl-eu-lon-2-portal.1.dblayer.com:25959/compose'
const pool = new Pool({
    connectionString: connectionString,
  })

 function getOccupancy (mediumID){
     var result = 0;
    const client = new Client({
        connectionString: connectionString,
      });
      client.connect();
    const queryText = `SELECT amount, time FROM filling_levels WHERE status = 1 AND medium_id = $1 ORDER BY time DESC LIMIT 1;`
    const values = [mediumID];
    client.query(queryText, values, (err, res) => {
      result = res;
        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows[0])
        }
      })
            
    return {
        status: 200,
        res: result
    }
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
