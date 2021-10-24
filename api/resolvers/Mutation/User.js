const { GraphQLString, GraphQLNonNull } = require('graphql');
const { dbQuery } = require('../../database');
const { AuthType } = require('../../types');
const { getTimeStamp, emailValidation, usernameValidation, passwordValidation } = require('../../libs/utils');
const { createHash, AuthToken } = require('../../libs/Auth');

const insertUser = {
  type: AuthType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { email, name, password }){
    // Validation
    const emailValid = emailValidation(email);
    if(!emailValid.status) return { code: 500, message: emailValid.message, token: null }

    const nameValid = usernameValidation(name);
    if(!nameValid.status) return { code: 500, message: nameValid.message, token: null }

    const passwordValid = passwordValidation(password);
    if(!passwordValid.status) return { code: 500, message: passwordValid.message, token: null }

    let hashedPwd = await createHash(password);
    
    let res = await dbQuery(`insert into User (email, name, password, createdAt) values ('${email}', '${name}', '${hashedPwd}', ${getTimeStamp()})`);
    
    const token = AuthToken.generate(email);
    return {code: 200, message: res.insertId, token: token};

  }
};

module.exports ={
  insertUser,
};