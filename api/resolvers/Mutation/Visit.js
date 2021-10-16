const { GraphQLInt, GraphQLNonNull } = require('graphql');
const { dbQuery } = require('../../database');
const { DefaultType } = require('../../types');
const { getTimeStamp } = require('../../libs/utils');

const insertVisit = {
  type: DefaultType,
  args: {
    userID: { type: new GraphQLNonNull(GraphQLInt) },
    postID: { type: new GraphQLNonNull(GraphQLInt) },
    categoryID: { type: new GraphQLNonNull(GraphQLInt) }
  },
  async resolve(_, { userID, postID, categoryID }){
    let res = await dbQuery(`INSERT INTO visit (userID, postID, categoryID, createdAt) VALUES (${userID}, ${postID}, ${categoryID}, ${getTimeStamp()});`);
    return res && res.insertId ? {code: 200, message: 'success'} : {code: 500, message: res.message};
  }
};

module.exports = {
  insertVisit
};