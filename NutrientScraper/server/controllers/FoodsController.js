const Food = require('../models/Foods.js');
const stringifyRow = require('../utils/stringifyRow.js');

/** defines user controller **/
class FoodsController {

  /**
   * @name constructor
   * @description constructor
   * @param {Object} parameters - query or body parameters for request
   * @param {Object} dbClient - Database client
   */
  constructor(parameters, dbClient) {
    this.parameters = parameters;
    this.dbClient = dbClient;
  }

  /**
   * @name index
   * @description default user controller method
   * @return {JSON}
   */
  index() {
    return {};
  }

  /**
   * @name create
   * @description creates new user
   * @return {JSON}
   */
  create() {
    const food = new Food(this.parameters, this.dbClient);
    food.createFood();
    return food;
  }

  /**
   * @name show
   * @description gets specified user
   * @return {JSON}
   */
  show(searchInput, sortType) {
    const food = new Food(this.parameters, this.dbClient);
    return food.showFood(searchInput, sortType)
      .then(rows => {
        return JSON.stringify(rows);
      });
  }

  /**
   * @name update
   * @description edits existing user
   * @return {JSON}
   */
  update() {
    return {};
  }

  /**
   * @name destroy
   * @description deletes specified user
   * @return {JSON}
   */
  destroy() {
    return {};
  }

}

/**
 * @name extractUserParameters
 * @description private function to grab required info for user
 * @param {Object} req - an incoming http request
 * @return {Object}
 */
function extractUserParameters(req) {

}


module.exports = FoodsController;
