const { GraphQLSchema } = require('graphql');
const Query = require('../resolvers/Query');
const Mutation = require('../resolvers/Mutation');

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = schema;
