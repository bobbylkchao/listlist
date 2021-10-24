const { DefaultType } = require('../../types');
const { AuthToken } = require('../../libs/Auth');

const queryTokenTest = {
  type: DefaultType,
  description: "Test token",
  async resolve(_, {}){
    if(!global.token || global.token === null || global.token === 'null'){
      return {code: 500, message: 'Token is missing'};
    }
    
    if(AuthToken.verify(global.token)){
      return {code: 200, message: 'Token Ok'};
    }else{
      return {code: 500, message: 'Token Expired'};
    }
  }
};

module.exports = queryTokenTest;
