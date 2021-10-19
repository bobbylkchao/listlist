// reducer for user auth state
const userAuthStateInit = {
  auth: false,
  name: '',
  email: '',
  headnav: '',
  createdAt: '',
};

const userAuth = (state = userAuthStateInit, action) => {
  switch(action.type){
    case 'login':
      return{
        state: action.value
      }
    case 'logout':
      return{
        state: userAuthStateInit
      }
    default:
      return state;
  }
}

export {
  userAuth,
}
