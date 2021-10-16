const { GraphQLString, GraphQLNonNull} = require('graphql');
const { dbQuery } = require('../../database');
const { DefaultType } = require('../../types');
const { diffHash } = require('../../libs/Auth');

const queryAuth = {
  type: DefaultType,
  description: "User login auth.",
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { email, password }){
    let res = await dbQuery(`SELECT password FROM User WHERE email = '${email}'`);
    let passwordInDB = res[0]?.password;

    if(!passwordInDB) return {code: 500, message: 'user is not exist'};
    
    let diff = await diffHash(password, passwordInDB);
    return {code: 200, message: diff};
  }
};

module.exports = queryAuth;
