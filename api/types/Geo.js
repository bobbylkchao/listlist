const { GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql');

const GeoType = new GraphQLObjectType({
  name: 'Geo',
  description: "Geo location infos via request ip.",
  fields: {
    country: {
      type: GraphQLString,
      description: "Country of IP, eg. CA",
    },
    region: {
      type: GraphQLString,
      description: "Region of IP, eg. MB",
    },
    city: {
      type: GraphQLString,
      description: "City of IP, eg. Winnipeg",
    },
    street: {
      type: GraphQLString,
      description: "Street name of this location",
    },
    zipcode: {
      type: GraphQLString,
      description: "Postal Code, eg. R3E 5H0",
    },
    remark: {
      type: GraphQLString,
      description: "remark message",
    }
  }
});

module.exports = GeoType;
