const { GraphQLString, GraphQLNonNull} = require('graphql');
const { dbQuery } = require('../../database');
const { DefaultType } = require('../../types');
const { diffHash } = require('../../libs/Auth');
const { emailValidation, passwordValidation } = require('../../libs/utils');

const queryAuth = {
  type: DefaultType,
  description: "User login auth.",
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { email, password }){
    // Validation
    const emailValid = emailValidation(email);
    if(!emailValid.status) return { code: 500, message: emailValid.message }

    const passwordValid = passwordValidation(password);
    if(!passwordValid.status) return { code: null, message: passwordValid.message }

    let res = await dbQuery(`SELECT password FROM User WHERE email = '${email}'`);
    let passwordInDB = res[0] ? res[0].password : '';

    if(!passwordInDB) return {code: 500, message: 'User is not exist'};
    
    let diff = await diffHash(password, passwordInDB);
    if(diff){
      return {code: 200, message: 'Success'};
    }else{
      return {code: 500, message: 'Email or password does not match'};
    }
    
  }
};

module.exports = queryAuth;
