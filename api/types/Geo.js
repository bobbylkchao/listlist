const { GraphQLObjectType, GraphQLFloat, GraphQLString } = require('graphql');

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
    streetNumber: {
      type: GraphQLString,
      description: "Street number",
    },
    street: {
      type: GraphQLString,
      description: "Street name of this location",
    },
    zipcode: {
      type: GraphQLString,
      description: "Postal Code, eg. R3E 5H0",
    },
    lat: {
      type: GraphQLFloat,
      description: "Latitude",
    },
    long: {
      type: GraphQLFloat,
      description: "Longitude",
    },
    remark: {
      type: GraphQLString,
      description: "remark message",
    }
  }
});

module.exports = GeoType;
