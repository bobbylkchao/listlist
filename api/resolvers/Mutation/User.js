const { GraphQLString, GraphQLNonNull } = require('graphql');
const { dbQuery } = require('../../database');
const { UserType } = require('../../types');
const { getTimeStamp, emailValidation, usernameValidation, passwordValidation } = require('../../libs/utils');
const { createHash } = require('../../libs/Auth');

const insertUser = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { email, name, password }){
    // Validation
    const emailValid = emailValidation(email);
    if(!emailValid.status) return { id: null, error: emailValid.message }

    const nameValid = usernameValidation(name);
    if(!nameValid.status) return { id: null, error: nameValid.message }

    const passwordValid = passwordValidation(password);
    if(!passwordValid.status) return { id: null, error: passwordValid.message }

    let hashedPwd = await createHash(password);
    let res = await dbQuery(`insert into User (email, name, password, createdAt) values ('${email}', '${name}', '${hashedPwd}', ${getTimeStamp()})`);
    return { id: res.insertId, error: null }
  }
};

module.exports ={
  insertUser,
};