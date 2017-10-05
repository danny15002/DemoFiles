const dvReqs = [ 0, 0, 0, 0, 0, 0, 2000, 50, 0, 0, 0.00185973092, 0.00453592909,
  0.00907185818, 0.01769012346, 0.01360778728, 0.00471736625, 0.00566991136,
  0.00680389364, 0.00181437163, 0.00566991136, 0.01179341564, 65, 20, 22.5,
  22.5, 0, 300, 300, 25, 20, 0, 0, 0, 1000, 18, 400, 1000, 3500, 2400, 15, 2,
  2, 70, 0, 5000, 1.5, 1.7, 20, 10, 2, 400, 6, 60, 400, 27, 80 ];

/**
 * @name populateList
 * @description Fetches client-side requests and populates tables
 */
function populateList() {
  const searchWords = document.getElementById('searchbar').value;
  const sort = document.getElementsByName('sort');
  let sortType;
  for (let i = 0; i < sort.length; i++) {
    if (sort[i].checked) sortType = sort[i].value;
  }
  const searchList = document.getElementById('searchList');
  while (searchList.firstChild) {
    searchList.removeChild(searchList.firstChild);
  }
  const url = '/foodSearch?query=' + searchWords + '&' + 'sort=' + sortType;
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
      const a = document.createElement('a');

      a.onclick = event => {
        event.preventDefault();
        a.style.color = '#800080';
        let k = 0;
        for (let key in text[i]) {
          if (text[i].hasOwnProperty(key)) {
            let t2node = document.getElementById(key);
            let t2dvnode = document.getElementById('dv_' + key);
            if (t2node != null) t2node.innerHTML = text[i][key];
            if (t2dvnode != null) {
              t2dvnode.innerHTML = (text[i][key]*100/dvReqs[k]).toFixed(0);
            }
          }
          k++;
        }
      };
      a.className = 'clickable';
      a.appendChild(desc);

      if (text[i].calories !== 0) {
        const cal = document.createTextNode(text[i].calories);
        const prot = document.createTextNode(text[i].protein);
        const fat = document.createTextNode(text[i].total_fat);

        tddesc.appendChild(a);
        tdcal.appendChild(cal);
        tdprot.appendChild(prot);
        tdfat.appendChild(fat);

        trnode.appendChild(tddesc);
        trnode.appendChild(tdcal);
        trnode.appendChild(tdprot);
        trnode.appendChild(tdfat);

        searchList.appendChild(trnode);
      }
    }
  });
}
