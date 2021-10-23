const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const UserType = new GraphQLObjectType({
  name: 'User',
  description: "User model.",
  fields: {
    id: {
      type: GraphQLInt,
      description: "User's ID",
    },
    name: {
      type: GraphQLString,
      description: "User's name",
    },
    email: {
      type: GraphQLString,
      description: "User's email address",
    },
    headnav: {
      type: GraphQLString,
      description: "User's headnav image file url",
    },
    review_rating: {
      type: GraphQLInt,
      description: "User's review rating",
    },
    createdAt: {
      type: GraphQLInt,
      description: "User's registration date",
    },
    error: {
      type: GraphQLString,
      description: "The error description of the error if an error occurs ",
    }
  }
});

module.exports = UserType;