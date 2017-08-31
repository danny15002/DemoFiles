const titles = [ 'id', 'Description', 'Measure', 'Measure_Unit', 'Weight',
  'Water', 'Calories', 'Protein', 'Alanine', 'Arginine', 'Cystine', 'Histidine',
  'Isoleucine', 'Leucine', 'Lysine', 'Methionine', 'Phenylalanine',
  'Threonine', 'Tryptophan', 'Tyrosine', 'Valine', 'Total_Fat',
  'Saturated_Fat', 'Monounsaturated_Fat', 'Polyunsaturated_Fat', 'Trans_Fat',
  'Cholesterol', 'Total_Carbohydrate', 'Dietary_Fiber', 'Sugars', 'Starch',
  'Alcohol', 'Caffeine', 'Calcium', 'Iron', 'Magnesium', 'Phosphorus',
  'Potassium', 'Sodium', 'Zinc', 'Copper', 'Manganese', 'Selenium',
  'Fluoride', 'Vitamin_A', 'Thiamin', 'Riboflavin', 'Niacin',
  'Pantothenicacid', 'Vitamin_B6', 'Folate', 'Vitamin_B12', 'Vitamin_C',
  'Vitamin_D', 'Vitamin_E', 'Vitamin_K', 'Store', 'Price',
  'Servings_per_Container', 'Category' ];
const connectToPSQL = require('./dbConnection');
const fs = require('fs');
const insertQuery = [];

insertQuery.push('DROP TABLE IF EXISTS foods;')
insertQuery.push('CREATE TABLE foods (');
insertQuery.push(titles[0] + ' ' + 'INTEGER PRIMARY KEY,');
insertQuery.push(titles[1] + ' ' + 'VARCHAR(100) NOT NULL,');
for (let i = 2; i < titles.length; i++) {
  if (i === 3 || i === 56) {
    insertQuery.push(titles[i] + ' ' + 'VARCHAR(100),');
    continue;
  }
  if (i === 59) {
    insertQuery.push(titles[i] + ' ' + 'VARCHAR(100));');
    continue;
  }
  insertQuery.push(titles[i] + ' ' + 'FLOAT,');
}

/**
 * @name promisifyCompleteTable
 * @description Promisify configureTableRows
 * @return {Promise}
 */
function promisifyCompleteTable() {
  return new Promise((resolve, reject) => {
    fs.readFile('./HEBdatabase.txt', 'utf8', (err, data) => {
      if (err) return reject(err);
      return resolve(configureTableRows(data));
    });
  });
}

/**
 * @name configureTableRows
 * @description Appends rows to inserQuery array to populate foods table
 * @param {String} data - string from fs module (table info)
 */
function configureTableRows(data) {
  const regexRemSpecChar = /([^0-9])(\,|\.|\')([^0-9])/g;
  const regexOpenQuote = /(\,)([^0-9])/g;
  const regexCloseQuote = /([^0-9])(\,)/g;
  data = data.replace(regexRemSpecChar, '$1$3');
  const tableEntries = data.split(/\r\n/g);
  insertQuery.push('INSERT INTO foods VALUES ');
  for (let i = 0; i < tableEntries.length - 1; i++) {
    let tableRow = tableEntries[i].replace(regexOpenQuote, `$1'$2`)
      .replace(regexCloseQuote, `$1'$2`);
    if (i === tableEntries.length - 2) {
      insertQuery.push(`(` + tableRow + `');`);
    } else {
      insertQuery.push(`(` + tableRow + `'),`);
    }
  }
}

/**
 * @name insertData
 * @description Inserts SQL commands to populate foods table
 * @param {Object} client - client object from pg module
 * @return {Object}
 */
function insertData(client) {
  return new Promise((resolve, reject) => {
    client.query(insertQuery.join(''), [], (err, result) => {
      if (err) return reject(err);
      resolve({ client: client, result: result });
    });
  });
}

promisifyCompleteTable()
  .then(connectToPSQL)
  .then(insertData)
  .then(result => {
    console.log('finished inserting');
    result.client.end();
  })
  .catch(err => console.log(err));
