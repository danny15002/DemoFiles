const Food = require('../models/Foods.js');

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
   * @description default food controller method
   * @return {JSON}
   */
  index() {
    return {};
  }

  /**
   * @name create
   * @description creates new food
   * @return {JSON}
   */
  create() {
    const food = new Food(this.parameters, this.dbClient);
    food.createFood();
    return food;
  }

  /**
   * @name show
   * @description gets specified food
   * @param {String} searchInput - Search input from client
   * @param {String} sortType - Sort type from client
   * @return {String}
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

module.exports = FoodsController;
