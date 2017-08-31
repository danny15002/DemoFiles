const pg = require('pg');
const connectToPSQL = require('./dbConnection.js');

function insertData(client) {
  return new Promise((resolve, reject) => {
    client.query('SELECT * FROM foods;', [], (err, result) => {
      if (err) return reject(err);
      resolve({ client: client, result: result });
    });
  });
}

connectToPSQL()
  .then(insertData)
  .then(result => {
    console.log('finished query');
    console.log(result.result.rows[0].description);
    result.client.end();
  })
  .catch(err => console.log(err));
