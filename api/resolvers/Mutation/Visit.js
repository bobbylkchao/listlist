const { GraphQLInt } = require('graphql');
const { dbQuery } = require('../../database');
const { VisitType } = require('../../types');
const { getTimeStamp } = require('../../libs/utils');

const insertVisit = {
  type: VisitType,
  args: {
    userID: { type: GraphQLInt },
    postID: { type: GraphQLInt },
    categoryID: { type: GraphQLInt }
  },
  async resolve(_, { userID, postID, categoryID }){
    const timestamp = getTimeStamp() || 1634342515;
    let res = await dbQuery(`INSERT INTO visit (userID, postID, categoryID, timestamp) VALUES (?, ?, ?, ${timestamp});`);
    return { id: res.insertId }
  }
};

module.exports = {
  insertVisit
};