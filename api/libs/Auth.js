const bcrypt = require('bcrypt');

const createHash = (password) => {
  return new Promise(resolve => {
    bcrypt.hash(password, 10, (err, hash) => {
      resolve(hash);
    });
  });
};

const diffHash = (pwdInput, pwdInDB) => {
  return new Promise(resolve => {
    bcrypt.compare(pwdInput, pwdInDB, function(err, result) {
      resolve(result);
    });
  });
};

module.exports = {
  createHash,
  diffHash,
};
