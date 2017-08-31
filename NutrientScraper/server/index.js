const connectToPSQL = require('./dbConnection.js');
const getRouter = require('./router/router.js');
const serverStart = require('./server.js');

connectToPSQL()
 .then(getRouter)
 .then(serverStart);
