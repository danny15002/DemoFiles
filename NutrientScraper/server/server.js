const http = require('http');

/**
 * @name startServer
 * @description returns a promise that resolves with a server object reference
 * @param {Function} router - callback function for routing http requests
 * @return {Promise}
 */
function startServer(router) {
  const server = http.createServer(router);
  return new Promise((resolve, reject) => {
    server.listen(9000, () => {
      console.log('SERVER LISTENING');
      resolve(server);
    });
  });
}

module.exports = startServer;
