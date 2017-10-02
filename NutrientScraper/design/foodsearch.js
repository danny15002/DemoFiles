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

function populateList() {
  const searchWords = document.getElementById('searchbar').value;
  const searchList = document.getElementById('searchList');
  while (searchList.firstChild) {
    searchList.removeChild(searchList.firstChild);
  }
  const url = '/foodSearch?query=' + searchWords;
  fetch(url, {
    method: 'GET'
  }).then(response => {
    return response.json();
  }).then(text => {
    for (let i = 0; i < text.length; i++) {
      const trnode = document.createElement('tr');
      const tddesc = document.createElement('td');
      const tdcal = document.createElement('td');
      const tdprot = document.createElement('td');
      const tdfat = document.createElement('td');
      const desc = document.createTextNode(text[i].description);
      const cal = document.createTextNode(text[i].calories);
      const prot = document.createTextNode(text[i].protein);
      const fat = document.createTextNode(text[i].total_fat);
      const a = document.createElement('a');

      // a.href = '/searchword='+searchWords;
      a.onclick = populateLabel();
      a.appendChild(desc);

      tddesc.appendChild(a);
      // tddesc.onclick = populateLabel();
      tdcal.appendChild(cal);
      tdprot.appendChild(prot);
      tdfat.appendChild(fat);

      trnode.appendChild(tddesc);
      trnode.appendChild(tdcal);
      trnode.appendChild(tdprot);
      trnode.appendChild(tdfat);

      searchList.appendChild(trnode);
    }
  });
}

function populateLabel() {
  // console.log('Test');
}
