const { GraphQLObjectType } = require('graphql');
const { insertUser } = require('./User');
const { insertVisit } = require('./Visit');
const { insertPost } = require('./Post');

const Mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addUser: insertUser,
    addVisit: insertVisit,
    addPost: insertPost,
  }
});

module.exports = Mutation;
