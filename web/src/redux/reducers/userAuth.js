// reducer for user auth state
const userAuthStateInit = {
  executed: false,
  auth: false,
  token: null,
  name: null,
  email: null,
  userID: null,
  createdAt: null,
  headnav: 'default',
};

const userAuth = (state = userAuthStateInit, action) => {
  switch(action.type){
    case 'setUserAuthState':
      return{
        state: action.value
      }
    case 'setUserAuthExecuted':
      return{
        state: {
          ...state,
          executed: true
        }
      }
    default:
      return state;
  }
}

export {
  userAuth,
}
