import { getGraphQL } from "../utils";
import { getGeoInfo } from "../data-request";

// Execute prefetchs before rendering
const preFetchExecute = (dispatch: (parms:any) => void) => {
  getGeoInfo(dispatch);
};

export {
  getGeoInfo,
  preFetchExecute,
};
