import { getAllCategories, getGeoInfo, tokenValidation } from "../data-request";
import { userAuthLSInfos } from "../utils";

// Execute prefetchs before rendering
const preFetchExecute = (reduxUseDispatch: (parms:any) => void) => {
  /**
   * Init the categories
   */
  getAllCategories((result:any) => {
    reduxUseDispatch({
      type: "saveCategories",
      value: result.data.category,
    });
  });

  /**
   * Init the user's geo infos
   */
  getGeoInfo((result:any) => {
    if(!result.data || !result.data.geo){
      reduxUseDispatch({
        type: "updateUserGeo",
        value:{
          country: "CA",
          region: "MB",
          city: "Winnipeg",
          ll: ['49.8179', '-97.1535'],
          remarks: "Error, use default values.",
        },
      });
    }

    reduxUseDispatch({
      type: "updateUserGeo",
      value:{
        country: result.data.geo.country,
        region: result.data.geo.region,
        city: result.data.geo.city,
        ll: result.data.geo.ll,
        remarks: "No error.",
      },
    });
  });

  /**
   * Init the user's auth infos
   */
  tokenValidation((result:any) => {
    if(result){
      const userAuthInfos = userAuthLSInfos.get();
      if(
        userAuthInfos.token &&
        userAuthInfos.name &&
        userAuthInfos.email &&
        userAuthInfos.userID &&
        userAuthInfos.createdAt &&
        userAuthInfos.headnav
      ){
        reduxUseDispatch({
          type: "setUserAuthState",
          value:{
            auth: true,
            token: userAuthInfos.token,
            name: userAuthInfos.name,
            email: userAuthInfos.email,
            userID: userAuthInfos.userID,
            createdAt: userAuthInfos.createdAt,
            headnav: userAuthInfos.headnav,
          },
        });
      }else{
        userAuthLSInfos.clear();
      }
    }
  });
};

export {
  preFetchExecute,
};
