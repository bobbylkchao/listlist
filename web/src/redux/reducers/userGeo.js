// reducer for storing user's geo infos
const userGeoInitData = {
  country: "CA",
  region: "MB",
  city: "Winnipeg",
  streetNumber: "223",
  street: "Carlton St",
  zipcode: "R3C 0V4",
  lat: 49.893910,
  long: -97.146480,
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
