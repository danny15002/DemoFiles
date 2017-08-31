// == Schema Information
//
// Table name: foods
//
//  id                        :integer          not null, primary key
//  description               :varchar(100)     not null
//  measure                   :float
//  measure_unit              :varchar(100)
//  weight                    :float
//  water                     :float
//  calories                  :float
//  protein                   :float
//  alanine                   :float
//  arginine                  :float
//  cystine                   :float
//  histidine                 :float
//  Isoleucine                :float
//  Leucine                   :float
//  Lysine                    :float
//  Methionine                :float
//  Phenylalanine             :float
//  Threonine                 :float
//  Tryptophan                :float
//  Tyrosine                  :float
//  Valine                    :float
//  Total_Fat                 :float
//  Saturated_Fat             :float
//  Monounsaturated_Fat       :float
//  Polyunsaturated_Fat       :float
//  Trans_Fat                 :float
//  Cholesterol               :float
//  Total_Carbohydrate        :float
//  Dietary_Fiber             :float
//  Sugars                    :float
//  Starch                    :float
//  Alcohol                   :float
//  Caffeine                  :float
//  Calcium                   :float
//  Iron                      :float
//  Magnesium                 :float
//  Phosphorus                :float
//  Potassium                 :float
//  Sodium                    :float
//  Zinc                      :float
//  Copper                    :float
//  Manganese                 :float
//  Selenium                  :float
//  Fluoride                  :float
//  Vitamin_A                 :float
//  Thiamin                   :float
//  Riboflavin                :float
//  Niacin                    :float
//  Pantothenicacid           :float
//  Vitamin_B6                :float
//  Folate                    :float
//  Vitamin_B12               :float
//  Vitamin_C                 :float
//  Vitamin_D                 :float
//  Vitamin_E                 :float
//  Vitamin_K                 :float
//  Store                     :varchar(100)
//  Price                     :float
//  Servings_per_Container    :float
//  Category                  :varchar(100)

const promisifyRows = require('../utils/retrieveDatabase.js');


/** defines food model **/
class Foods {

  /**
   * @name constructor
   * @description initializes User object
   * @param {Object} parameters - query or body parameters for request
   * @param {Object} dbClient - client for database connection
   */
  constructor(parameters, dbClient) {
    this.parameters = parameters;
    this.dbClient = dbClient;
  }

  /**
   * @name createUser
   * @description creates a new user in the database
   * @param {Array} foodArray array with all nutrition information
   * @return {Object}
   */
  createFood() {
    this.newfood = "chicken";
    return this.newfood;
  }

  /**
   * @name showFood
   * @description gets specified user
   * @return {Object}
   */
  showFood() {
    return promisifyRows(this.dbClient)
      .then(rows => {
        return rows;
      });
  }

  /**
   * @name updateFood
   * @description edits existing user
   * @return {JSON}
   */
  updateFood() {
    return {};
  }

  /**
   * @name destroyFood
   * @description deletes specified user
   * @return {JSON}
   */
  destroyFood() {
    return {};
  }
}
module.exports = Foods;
