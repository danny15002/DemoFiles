const pg = require('pg');

const dbConfig = {
  user: 'sampleuser', // env var: PGUSER
  database: 'sampledb', // env var: PGDATABASE
  password: 'password', // env var: PGPASSWORD
  max: 10 // max number of clients in the pool
};

function connectToPSQL() {
  const pool = new pg.Pool(dbConfig);
  pool.on('error', err => {
    console.log('PSQL pool error', err);
  });

  return new Promise(function (resolve, reject) {
    pool.connect((err, client) => {
      if(err) return reject(err);
      console.log('Connected to database');
      return resolve(client);
    });
  });
}

module.exports = connectToPSQL;
