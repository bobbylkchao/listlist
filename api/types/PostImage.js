const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const PostImageType = new GraphQLObjectType({
  name: "PostImage",
  description: "The image list of the post.",
  fields: {
    id: {
      type: GraphQLInt,
      description: "ID of the image item.",
    },
    postID: {
      type: GraphQLInt,
      description: "The post id.",
    },
    thumbnail: {
      type: GraphQLString,
      description: "The thumbnail image address.",
    },
    original: {
      type: GraphQLString,
      description: "The orininal image address.",
    },
  }
});

module.exports = PostImageType;