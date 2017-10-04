/**
 * @name function_name
 * @description function_description
 * @param {parameter_type} parameter_name - parameter_description
 * @return {return_type}
 */
function promisifyRows(client, searchInput, sortType) {
  return new Promise((resolve, reject) => {
    const table = `SELECT * FROM foods WHERE `;
    const filter = `LOWER(description) LIKE LOWER('%` + searchInput + `%') `;
    const sort = `ORDER BY ` + sortType + `;`;
    client.query(table + filter + sort, [], (err, result) => {
      if (err) return reject(err);
      resolve(result.rows);
    });
  });
}

module.exports = promisifyRows;
