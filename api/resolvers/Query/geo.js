const geoip = require('geoip-lite');
const { GeoType } = require('../../types');

const queryGeo = {
  type: GeoType,
  description: "Get the geo infos.",
  async resolve(_, {}){
    if(global.requestIP.length > 15){
      // ipv6, return blank object directly, and leave it to html5 geolocation to determine
      return {};
    }else{
      const geoResult = geoip.lookup(global.requestIP);
      return global.requestIP ? geoResult : {};
    }
  }
};

module.exports = queryGeo;
