// reducer for storing user's geo infos
const userGeoInitData = {
  country: "CA",
  region: "MB",
  city: "Winnipeg",
  street: "Carlton St",
  zipcode: "R3C 0V4",
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
