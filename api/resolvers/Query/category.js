const { GraphQLList } = require('graphql');
const { dbQuery } = require('../../database');
const { CategoryType } = require('../../types');

const queryCategory = {
  type: new GraphQLList(CategoryType),
  description: "Get category list.",
  async resolve(){
    let res = await dbQuery(`SELECT * FROM category WHERE upperID = 0`);
    return res;
  }
};

module.exports = queryCategory;
