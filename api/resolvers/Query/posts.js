const { GraphQLList, GraphQLInt, GraphQLNonNull } = require('graphql');
const { dbQuery } = require('../../database');
const { PostType } = require('../../types');

const queryPosts = {
  type: new GraphQLList(PostType),
  description: "Get post list.",
  args: {
    categoryID: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "The id of the category that needs to get the data."
    },
    lastID: {
      type: GraphQLInt,
      description: "(Optional) From which ID to get the data."
    },
  },
  async resolve(_, { categoryID, lastID }){
    let fromIDFilter = lastID ? `AND  id < ${lastID}` : '';
    let categoryIDFilter = categoryID ? `WHERE categoryID = ${categoryID}` : '';
    let res = await dbQuery(`SELECT * FROM Post ${categoryIDFilter} ${fromIDFilter} ORDER BY id desc, updatedAt desc limit 10`);
    return res;
  }
};

module.exports = queryPosts;
