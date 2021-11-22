//const geoip = require('geoip-lite');
const { GraphQLNonNull, GraphQLFloat } = require('graphql');
const NodeGeocoder = require('node-geocoder');
const { GeoType } = require('../../types');

const queryGeo = {
  type: GeoType,
  description: "Get the geo infos.",
  args: {
    lat: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: "Latitude"
    },
    long: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: "Longitude"
    },
  },
  async resolve(_, {lat, long}){

    const { GOOGLE_MAP_GEOCODE_KEY } = process.env;

    if(!GOOGLE_MAP_GEOCODE_KEY){
      return {
        country: "CA",
        region: "MB",
        city: "Winnipeg",
        streetNumber: "223",
        street: "Carlton St",
        zipcode: "R3C 0V4",
        remark: "failed, not configured GOOGLE_MAP_GEOCODE_KEY in .env, use default value",
      };
    }

    const options = {
      provider: 'google',
      httpAdapter: 'https', // Default
      apiKey: GOOGLE_MAP_GEOCODE_KEY, // for Mapquest, OpenCage, Google Premier
      formatter: 'json' // 'gpx', 'string', ...
    };
    
    const geocoder = NodeGeocoder(options);
    
    const res = await geocoder.reverse({lat: lat, lon: long});

    return {
      country: res[0].countryCode,
      region: res[0].administrativeLevels.level1short,
      city: res[0].city,
      streetNumber: res[0].streetNumber,
      street: res[0].streetName,
      zipcode: res[0].zipcode,
      remark: "success",
    };

  }
};

module.exports = queryGeo;
