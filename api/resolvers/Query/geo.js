const geoip = require('geoip-lite');
const { GeoType } = require('../../types');

const queryGeo = {
  type: GeoType,
  description: "Get the geo infos.",
  async resolve(_, {}){
    const geoResult = geoip.lookup(global.requestIP);
    console.log(geoResult);
    return global.requestIP ? geoResult : {};
  }
};

module.exports = queryGeo;
