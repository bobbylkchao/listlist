const { GraphQLObjectType } = require('graphql');
const insertUser = require('./insertUser');

const Mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    // Insert a new user record
    insertUser: insertUser
  }
});

module.exports = Mutation;
