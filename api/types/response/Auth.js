const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const AuthType = new GraphQLObjectType({
  name: 'AuthType',
  fields: {
    code: {
      type: GraphQLInt,
      description: "Processing Status",
    },
    message: {
      type: GraphQLString,
      description: "Message of Processing",
    },
    token: {
      type: GraphQLString,
      description: "Token, if needed",
    },
  }
});

module.exports = AuthType;