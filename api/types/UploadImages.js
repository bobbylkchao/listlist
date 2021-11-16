const { GraphQLString, GraphQLBoolean, GraphQLInputObjectType } = require('graphql');

const UploadImagesType = new GraphQLInputObjectType({
  name: 'UploadImagesType',
  fields: {
    img: {
      type: GraphQLString,
      description: "Base64 of image",
    },
    thumbnail: {
      type: GraphQLString,
      description: "Base64 of image thumbnail",
    },
    main: {
      type: GraphQLBoolean,
      description: "Main image of images, true or false",
    }
  }
});

module.exports = UploadImagesType;
