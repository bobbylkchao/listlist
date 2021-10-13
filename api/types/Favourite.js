const { GraphQLObjectType, GraphQLInt } = require('graphql');

const FavouriteType = new GraphQLObjectType({
  name: 'Favourite',
  fields: {
    id: { type: GraphQLInt },
    userID: { type: GraphQLInt },
    postID: { type: GraphQLInt },
    createdAt: { type: GraphQLInt },
  }
});

module.exports = FavouriteType;