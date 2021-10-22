import { getGraphQL } from "../utils";

// Execute prefetchs before rendering
const preFetchExecute = (dispatch: (parms:any) => void) => {
  getGeoInfo(dispatch);
};

// Get user geo infos
const getGeoInfo = (dispatch: (parms:any) => void) => {
  getGraphQL(`
    query{
      geo{
        country,
        region,
        city,
        ll
      }
    }
  `, (result: any) => {
    if(!result.data || !result.data.geo){
      dispatch({
        type: 'updateUserGeo',
        value: {
          country: "CA",
          region: "MB",
          city: "Winnipeg",
          ll: ['49.8179', '-97.1535'],
          remarks: "Error, use default values.",
        },
      });
      return;
    }
    dispatch({
      type: 'updateUserGeo',
      value: {
        country: result.data.geo.country,
        region: result.data.geo.region,
        city: result.data.geo.city,
        ll: result.data.geo.ll,
        remarks: "No error.",
      },
    });
  });
};

export {
  getGeoInfo,
  preFetchExecute,
};
