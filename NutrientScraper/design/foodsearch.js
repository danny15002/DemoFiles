function populateList() {
  for (let i = 0; i < 5; i++) {
    const trnode = document.createElement('tr');
    const searchList = document.getElementById('searchList');


    for (let j = 0; j < 4; j++) {
      const tdnode = document.createElement('td');
      const textnode = document.createTextNode('Test');
      tdnode.appendChild(textnode);
      trnode.appendChild(tdnode);
    }

    searchList.appendChild(trnode);
  }
}
