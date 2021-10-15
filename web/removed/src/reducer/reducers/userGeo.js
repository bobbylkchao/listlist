// reducer for storing currently selected category
const userGeoInitData = {
  country: "CA",
  region: "MB",
  city: "Winnipeg",
  ll: ["49.8179","-97.1535"],
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
