const { GraphQLInt, GraphQLNonNull} = require('graphql');
const { dbQuery } = require('../../database');
const { UserType } = require('../../types');

const queryUser = {
  type: UserType,
  description: "Get a user.",
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "User's ID",
    }
  },
  async resolve(_, { id }){
    let res = await dbQuery(`SELECT * FROM user WHERE id = ${id}`);
    return res[0];
  }
};

module.exports = queryUser;
