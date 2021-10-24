const { GraphQLString, GraphQLNonNull} = require('graphql');
const { dbQuery } = require('../../database');
const { AuthType } = require('../../types');
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

    let res = await dbQuery(`SELECT password FROM User WHERE email = '${email}'`);
    let passwordInDB = res[0] ? res[0].password : '';

    if(!passwordInDB) return { code: 500, message: 'User is not exist', token: null };
    
    let diff = await diffHash(password, passwordInDB);
    if(diff){
      const token = AuthToken.generate(email);

      if(token){
        return {code: 200, message: 'Success', token: token};
      }else{
        return {code: 500, message: 'Failed to create token', token: null};
      }
      
    }else{
      return {code: 500, message: 'Email or password does not match', token: null};
    }
    
  }
};

module.exports = queryAuth;
