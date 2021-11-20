const { GraphQLList } = require('graphql');
const { dbQuery } = require('../../database');
const { UserType } = require('../../types');

const queryUsers = {
  type: new GraphQLList(UserType),
  description: "Get user list.",
  async resolve(_, {}){
    let res = await dbQuery(`SELECT * FROM user`);
    return res;
  }
};

module.exports = queryUsers;
