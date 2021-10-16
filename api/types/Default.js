const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const DefaultType = new GraphQLObjectType({
  name: 'Auth',
  description: "Auth",
  fields: {
    code: {
      type: GraphQLInt,
      description: "Code of result, 200 means success, others are failed.",
    },
    message: {
      type: GraphQLString,
      description: "Details info of result.",
    }
  }
});

module.exports = DefaultType;
