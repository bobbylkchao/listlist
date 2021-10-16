const { GraphQLObjectType, GraphQLInt } = require('graphql');

const VisitType = new GraphQLObjectType({
  name: 'Visit',
  description: "Visit model.",
  fields: {
    userID: {
      type: GraphQLInt,
      description: "User's ID",
    },
    postID: {
      type: GraphQLInt,
      description: "Post's ID",
    },
    categoryID: {
      type: GraphQLInt,
      description: "Category's ID",
    },
    categoryID: {
      type: GraphQLInt,
      description: "Category's ID",
    },
    createdAt: {
      type: GraphQLInt,
      description: "User's visit date",
    },
  }
});

module.exports = VisitType;