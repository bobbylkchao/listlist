import { getGraphQL } from "../utils";
import { getGeoInfo, tokenValidation } from "../data-request";

// Execute prefetchs before rendering
const preFetchExecute = (dispatch: (parms:any) => void) => {
  getGeoInfo(dispatch);
  tokenValidation();
};

export {
  preFetchExecute,
};
