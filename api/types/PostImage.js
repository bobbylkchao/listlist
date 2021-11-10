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
    url: {
      type: GraphQLString,
      description: "The image address.",
    },
    main: {
      type: GraphQLInt,
      description: "Main image of images",
    },
  }
});

module.exports = PostImageType;