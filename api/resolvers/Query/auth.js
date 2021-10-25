const { GraphQLString, GraphQLNonNull} = require('graphql');
const { dbQuery } = require('../../database');
const { AuthType, DefaultType } = require('../../types');
const { diffHash, AuthToken } = require('../../libs/Auth');
const { emailValidation, passwordValidation } = require('../../libs/utils');

const queryAuth = {
  type: AuthType,
  description: "User login auth.",
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { email, password }){
    // Validation
    const emailValid = emailValidation(email);
    if(!emailValid.status) return { code: 500, message: emailValid.message, token: null }

    const passwordValid = passwordValidation(password);
    if(!passwordValid.status) return { code: null, message: passwordValid.message, token: null }

    let res = await dbQuery(`SELECT * FROM User WHERE email = '${email}'`);
    let passwordInDB = res[0] ? res[0].password : '';

    if(!passwordInDB) return { code: 500, message: 'User is not exist', token: null };
    
    let diff = await diffHash(password, passwordInDB);
    if(diff){
      const token = AuthToken.generate(email);
      const resUserInfos = JSON.stringify({
        name: res[0].name,
        email: res[0].email,
        userID: res[0].id,
        headnav: res[0].headnav,
        createdAt: res[0].createdAt,
      });

      if(token){
        return {
          code: 200,
          message: resUserInfos,
          token: token,
        };
      }else{
        return {code: 500, message: 'Failed to create token', token: null};
      }
      
    }else{
      return {code: 500, message: 'Email or password does not match', token: null};
    }
    
  }
};

const queryTokenValidation = {
  type: DefaultType,
  description: "Validate the token",
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

module.exports = {
  queryAuth,
  queryTokenValidation,
};
