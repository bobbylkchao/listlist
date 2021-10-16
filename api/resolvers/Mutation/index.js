const { GraphQLObjectType } = require('graphql');
const { insertUser } = require('./User');
const { insertVisit } = require('./Visit');

const Mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addUser: insertUser,
    addVisit: insertVisit,
  }
});

module.exports = Mutation;
