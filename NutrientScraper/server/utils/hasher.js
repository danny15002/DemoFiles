'use strict';
const crypto = require('crypto');

/**
 * @name hashPassword
 * @description hashes a string
 * @param {String} string
 * @return {Object}
 */
function hashString(string) {
  const rand = crypto.randomBytes(512);
  const salt = rand.toString('hex');
  const hash = crypto.createHmac('sha512', salt);
  hash.update(string);
  const digest = hash.digest('hex');
  return {
    salt: salt,
    stringHash: digest
  };
}

/**
 * @name verifyString
 * @description verify string hashes to the provided hash
 * @param {String} string - string to be verified
 * @param {String} trueHash - hashed string
 * @return {Boolean} returns true if string matches
 */
function verifyString(string, trueHash) {
  const salthash = trueHash.split('.');
  const stringHash = crypto.createHmac('sha512', salthash[0]);
  stringHash.update(string);
  const digest = stringHash.digest('hex');
  return digest === salthash[1];
}

module.exports = {
  hashString: hashString,
  verifyString: verifyString
};
