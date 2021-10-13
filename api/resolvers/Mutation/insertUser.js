const { GraphQLString } = require('graphql');
const { dbQuery } = require('../../database');
const { UserType } = require('../../types');

const insertUser = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    name: { type: GraphQLString }
  },
  async resolve(_, { email, name }){
    let res = await dbQuery(`insert into User (email, name) values ('${email}', '${name}')`);
    return { id: res.insertId, email, name }
  }
};

module.exports = insertUser;