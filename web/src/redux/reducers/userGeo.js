// reducer for storing currently selected category
import { getGeoInfo } from "../../data-request";

const userGeoInitData = {
  country: "CA",
  region: "MB",
  city: "Winnipeg",
  remarks: "Initial value",
};

const userGeo = (state = userGeoInitData, action) => {
  switch(action.type){
    case 'updateUserGeo':
      return{
        state: action.value
      }
    default:
      return state;
  }
}

export { userGeo };
