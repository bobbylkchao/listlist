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

    // Create hashed password
    let hashedPwd = await createHash(password);

    // Get current timestamp
    const currentTimestamp = getTimeStamp();
    
    // Insert to DB
    let res = await dbQuery(`insert into user (email, name, password, reg_channel, createdAt) values ('${email}', '${name}', '${hashedPwd}', 'listlist',${currentTimestamp})`);
    
    // Generate the auth token for user
    const token = AuthToken.generate(email);

    // Static return infos
    const resUserInfos = JSON.stringify({
      userID: res.insertId,
      createdAt: currentTimestamp,
    });

    // Return
    return {code: 200, message: resUserInfos, token: token};

  }
};

module.exports ={
  insertUser,
};