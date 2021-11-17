const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

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

const AuthToken = {
  generate: (email) => {
    // @default The expiration time is 7 days by default 7d
    return email ? jwt.sign({ email: email }, process.env.TOKEN_SECRET, { expiresIn: '2d' }) : false;
  },
  verify: (token) => {
    try{
      if(jwt.verify(token, process.env.TOKEN_SECRET)){
        return true;
      }else{
        return false;
      }
    }catch(err){
      return false;
    }
  },
};

module.exports = {
  createHash,
  diffHash,
  AuthToken,
};
