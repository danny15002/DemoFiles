/**
 * @name function_name
 * @description function_description
 * @param {parameter_type} parameter_name - parameter_description
 * @return {return_type}
 */
function promisifyRows(client, searchInput) {
  return new Promise((resolve, reject) => {
    client.query(`SELECT * FROM foods WHERE LOWER(description) LIKE LOWER('%` + searchInput + `%');`, [], (err, result) => {
    // client.query(`SELECT * FROM foods`, [], (err, result) => {
      if (err) return reject(err);
      resolve(result.rows);
    });
  });
}

module.exports = promisifyRows;
