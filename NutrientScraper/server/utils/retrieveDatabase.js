/**
 * @name function_name
 * @description function_description
 * @param {parameter_type} parameter_name - parameter_description
 * @return {return_type}
 */
function promisifyRows(client) {
  return new Promise((resolve, reject) => {
    client.query('SELECT * FROM foods WHERE id<3;', [], (err, result) => {
      if (err) return reject(err);
      resolve(result.rows);
    });
  });
}

module.exports = promisifyRows;
