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
    ll: {
      type: GraphQLList(GraphQLString),
      description: "Latitude and longitude of IP, eg. [ 49.8179, -97.1535 ]",
    }
  }
});

module.exports = GeoType;
