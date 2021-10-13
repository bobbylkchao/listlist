const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const ReviewsType = new GraphQLObjectType({
  name: 'Reviews',
  fields: {
    id: { type: GraphQLInt },
    postID: { type: GraphQLInt },
    userID: { type: GraphQLInt },
    star: { type: GraphQLInt },
    content: { type: GraphQLString },
    createdAt: { type: GraphQLInt },
  }
});

module.exports = ReviewsType;