const FoodsController = require('../controllers/FoodsController.js');

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
        if (url.match(/\/foods/)) {
          return routeFoods(json, url, method, dbConnection);
        } else res.write('you requested: ' + url);
      })
      .then(responsePayload => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
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
function routeFoods(json, url, method, dbConnection) {
  const foodsController = new FoodsController(json, dbConnection);
  if (method === 'POST') {
    const responsePayload = foodsController.create();
    return responsePayload;
  } else if (method === 'GET') {
    const responsePayload = foodsController.show();
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
