const FoodsController = require('../controllers/FoodsController.js');
const fs = require('fs');

/**
 * @name getRouter
 * @description forms closure around database connection
 * @param {Object} dbConnection - reference to database connection
 * @return {Function}
 */
function getRouter(dbConnection) {
  /**
   * @name router
   * @description routes requests
   * @param {Object} req - an http request
   * @param {Object} res - an http response
   */
  return function router(req, res) {
    const url = req.url;
    const method = req.method;
    streamRequestData(req)
      .then(reqBody => {
        if (!reqBody) return '';
        return JSON.parse(reqBody);
      })
      .then(json => {
        // Switch?
        if (url === '/') {
          return new Promise((resolve, reject) => {
            fs.readFile('./design/index.html', 'utf-8', (err, data) => {
              if (err) return reject(err);
              return resolve(data);
            });
          });
        } else if (url.match(/\/stylesheet/)) {
          return new Promise((resolve, reject) => {
            fs.readFile('./design/stylesheet.css', 'utf-8', (err, data) => {
              if (err) return reject(err);
              return resolve(data);
            });
          });
        } else if (url.match(/\/foodsearch/)) {
          return new Promise((resolve, reject) => {
            fs.readFile('./design/foodsearch.js', 'utf-8', (err, data) => {
              if (err) return reject(err);
              return resolve(data);
            });
          });
        } else if (url.match(/foodSearch\?.+/)) {
            const searchInput = url.split('?query=')[1];
            return routeFoods(json, url, method, dbConnection, searchInput);
        } else if (url.match(/\/foods/)) {
            return routeFoods(json, url, method, dbConnection, '');
        } else return 'you requested: ' + url;
      })
      .then(responsePayload => {
        res.writeHead(200);
        // res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(responsePayload);
        res.end();
      })
      .catch(err => {
        res.write(err.message);
        res.end();
      });
  };
}

/**
 * @name routeFoods
 * @description call appropriate food controller method
 * @param {Object} json
 * @param {String} url
 * @param {String} method
 * @param {Object} dbConnection
 */
function routeFoods(json, url, method, dbConnection, searchInput) {
  const foodsController = new FoodsController(json, dbConnection);
  if (method === 'POST') {
    const responsePayload = foodsController.create();
    return responsePayload;
  } else if (method === 'GET') {
    const responsePayload = foodsController.show(searchInput);
    return responsePayload;
  }
}

/**
 * @name streamRequestData
 * @description promisifies request data stream
 * @param {Object} req - node http request
 * @return {Promise}
 */
function streamRequestData(req) {
  return new Promise((resolve, reject) => {
    const data = [];
    req.on('data', datum => {
      data.push(new Buffer(datum).toString('utf-8'));
    });
    req.on('end', () => resolve(data.join('')));
    req.on('error', err => reject(err));
  });
}


module.exports = getRouter;
