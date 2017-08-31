
const titles = [ 'id', 'Description', 'Measure', 'Measure Unit', 'Weight',
  'Water', 'Calories', 'Protein', 'Alanine', 'Arginine', 'Cystine', 'Histidine',
  'Isoleucine', 'Leucine', 'Lysine', 'Methionine', 'Phenylalanine',
  'Threonine', 'Tryptophan', 'Tyrosine', 'Valine', 'Total Fat',
  'Saturated Fat', 'Monounsaturated Fat', 'Polyunsaturated Fat', 'Trans Fat',
  'Cholesterol', 'Total Carbohydrate', 'Dietary Fiber', 'Sugars', 'Starch',
  'Alcohol', 'Caffeine', 'Calcium', 'Iron', 'Magnesium', 'Phosphorus',
  'Potassium', 'Sodium', 'Zinc', 'Copper', 'Manganese', 'Selenium',
  'Fluoride', 'Vitamin A', 'Thiamin', 'Riboflavin', 'Niacin',
  'Pantothenicacid', 'Vitamin B6', 'Folate', 'Vitamin B12', 'Vitamin C',
  'Vitamin D', 'Vitamin E', 'Vitamin K', 'Store', 'Price',
  'Servings per Container', 'Category' ];
const units = [ '', '', '', '', 'g', 'g', '', 'g', 'g', 'g', 'g', 'g', 'g', 'g',
  'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'mg', 'g', 'g',
  'g', 'g', 'g', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg', 'mg',
  '&#956g', '&#956g', 'IU', 'mg', 'mg', 'mg', 'mg', 'mg', '&#956g', '&#956g',
  'mg', 'IU', 'mg', '&#956g', '', '$', '', '' ];

/**
 * @name function_name
 * @description function_description
 * @param {parameter_type} parameter_name - parameter_description
 * @return {return_type}
 */
function stringifyRow(row) {
  const ulString = [];
  let i = 0;
  for (let key in row) {
    if (row.hasOwnProperty(key)) {
      if (titles[i] === 'Price') {
        ulString.push('<ul>' + titles[i] + ': ' + units[i] + row[key] + '</ul>');
      } else {
        ulString.push('<ul>' + titles[i] + ': ' + row[key] + units[i] + '</ul>');
      }
      i++;
    }
  }
  return ulString.join('');
}

module.exports = stringifyRow;
