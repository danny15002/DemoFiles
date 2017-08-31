const titles = [ 'id', 'Description', 'Measure', 'Measure Unit', 'Weight', 'Water',
  'Calories', 'Protein', 'Alanine', 'Arginine', 'Cystine', 'Histidine',
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
const dvReqs = [ 0, 0, 0, 0, 0, 2000, 50, 0, 0, 0.00185973092, 0.00453592909,
  0.00907185818, 0.01769012346, 0.01360778728, 0.00471736625, 0.00566991136,
  0.00680389364, 0.00181437163, 0.00566991136, 0.01179341564, 65, 20, 22.5,
  22.5, 0, 300, 300, 25, 20, 0, 0, 0, 1000, 18, 400, 1000, 3500, 2400, 15, 2,
  2, 70, 0, 5000, 1.5, 1.7, 20, 10, 2, 400, 6, 60, 400, 27, 80 ];
const request = require('request');
const fs = require('fs');
const protdom = 'https://www.heb.com';
const starturl = 'https://www.heb.com/category/shop/food-and-drinks/grocery/snacks-and-candy/dried-fruits-and-nuts/3080/3508';
const t = [ new Date().getTime() ];
let id = 0;

// Execute promise statements in order of tiers
promisifyTierTwoURLs(starturl)
  .then(promisifyTierOneURLs)
  .then(splitFoodURLs)
  .catch(err => console.log(err));

// Provide elapsed time between functions in seconds
function elapsedTime(func, tn) {
  let lastind = t.length-1;
  console.log(func + ': ' + (tn-t[lastind])/1000 + 's');
  t.push(tn);
}
function showRejects(myarray) {
  console.log(myarray);
}
// Promise to body content of url
function promisifyRequest(url) {
  return new Promise((resolve, reject) => {
    request(url, { timeout: 10000 }, (err, resp, body) => {
      if (err) {
        if (err.code === 'ESOCKETTIMEDOUT' || err.code === 'ETIMEDOUT') {
          resolve(promisifyRequest(url));
        } else {
          return reject(err);
        }
      }
      return resolve(body);
    });
  });
}

// Promisify all tier 2 URLs and return array of tier 1 URLs
function promisifyTierTwoURLs(t2urls) {
  elapsedTime('promisifyTierTwoURLs', new Date().getTime());
  const promiseArray = [ t2urls ].map(url => {
    return promisifyRequest(url)
    .then(findTierOneURLs)
    .catch(err => console.log(err));
  });
  return Promise.all(promiseArray);
}

// Promisify all tier 1  URLs and return array of food URLs
function promisifyTierOneURLs(t1urls) {
  elapsedTime('promisifyTierOneURLs', new Date().getTime());
  t1urls = t1urls.reduce((a, b) => a.concat(b));
  const promiseArray = t1urls.map(url => {
    return promisifyRequest(url)
      .then(findFoodURLs)
      .catch(err => console.log(err));
  });
  return Promise.all(promiseArray);
}

// Split and Evaluate food urls one-by-one
function splitFoodURLs(foodurls) {
  elapsedTime('splitFoodURLs', new Date().getTime());
  foodurls = foodurls.reduce((a, b) => a.concat(b));
  foodurls.forEach(url => {
    promisifyRequest(url)
      .then(scrapeNutrition)
      .catch(err => {
        fs.appendFile('ScrapeErrors.txt', url +'\r\n');
        //splitFoodURLs( [[ url ]] );
      });
  });
}

// Takes tier 2 url bodies and returns tier 1 urls
function findTierOneURLs(mybody) {
  const regexPageURLS = /<div class="paging-container"[\S\s]*?<a href="([\S\s]*?)No=[0-9]+([\S\s]*?)"/;
  const regexAllPages = /<div class="pagenofn">[\S\s]*?of ([0-9]+)/;
  const pageURLMatches = regexPageURLS.exec(mybody);
  const allPagesMatches = regexAllPages.exec(mybody);
  let k = 0;
  const urls = [];
  while (k < allPagesMatches[1]) {
    urls.push(protdom + pageURLMatches[1] + 'No=' + k + pageURLMatches[2]);
    k += 35;
  }
  return urls;
}

// Takes tier 1 url bodies and returns food urls
function findFoodURLs(mybody) {
  const regexT0URLS = /<div class="cat-list-deparment">[\S\s]*?"(.+)"[\S\s]*?<\/div>/g;
  const urls = [];
  let t0URLMatches = [];
  while (t0URLMatches = regexT0URLS.exec(mybody)) {
    urls.push(protdom + t0URLMatches[1]);
  }
  return urls;
}

// Append nutrition information to testfile.txt
function scrapeNutrition(prodbody) {
  //elapsedTime('scrapeNutrition', new Date().getTime());
  const prod = [];
  for (let i = 0; i < titles.length; i++) prod.push(0);
  prod[3] = ''; prod[56] = 'H-E-B'; prod[59] = '';
  const regexServ = /Serving Size[\S\s]*?([0-9.]+)[\S\s]*?([a-zA-Z]+)[\S\s]*?([0-9.]+)[\S\s]*?([0-9.]+)/g;
  const regexNut = /<td class="label[\S\s]*?([a-zA-Z\s]+)[\S\s]*?([0-9.]+)/g;
  const regexCal = /Calories<[\S\s]*?">([0-9.]+)/;
  const regexDesc = /<h1 itemprop="name">([\S\s]*?)<\/h1>/;
  const regexPrice = /<span class="pricelabel">[\S\s]*?([0-9.]+)/;
  const regexAisle = /<title>[\s\S]*?Shop ([\S\s]*?) at/;
  const servMatches = regexServ.exec(prodbody);
  const descMatch = regexDesc.exec(prodbody);
  const calMatch = regexCal.exec(prodbody);
  const priceMatch = regexPrice.exec(prodbody);
  const aisleMatch = regexAisle.exec(prodbody);
  let nutMatches = [];
  prod[0] = id; id++;
  if (descMatch != null) prod[1] = descMatch[1].replace(/\,/g, ' ');
  if (calMatch != null) prod[6] = Number(calMatch[1]);
  if (priceMatch != null) prod[57] = Number(priceMatch[1]);
  if (aisleMatch != null) prod[59] = aisleMatch[1];
  if (servMatches != null) {
    if (servMatches.length === 5) {
      prod[2] = Number(servMatches[1]);
      prod[3] = servMatches[2];
      prod[4] = Number(servMatches[3]);
      prod[58] = Number(servMatches[4]);
    }
  }
  while (nutMatches = regexNut.exec(prodbody)) {
    let k = titles.indexOf(nutMatches[1]);
    if (k > -1 && k != 5) {
      if (k < 32) prod[k] = Number(nutMatches[2]);
      if (k >= 32) prod[k] = Number(nutMatches[2]*dvReqs[k]/100);
    }
  }
  fs.appendFile('HEBdatabase.txt', prod + '\r\n');
}
