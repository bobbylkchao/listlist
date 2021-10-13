import { showBottomTabBar, hideBottomTabBar} from '../../utils';

//reducer for bottom tab bar visible
const bottomTabBar_Reducer = (state = true, action) => {
  switch(action.type){
    case 'changeBottomTabBarVisibleStatus':
      switch(action.value){
        case '/news':
          showBottomTabBar();
          return{
            state: true
          }
        case '/local':
          showBottomTabBar();
          return{
            state: true
          }
        case '/yellow':
          showBottomTabBar();
          return{
            state: true
          }
        case '/me':
          showBottomTabBar();
          return{
            state: true
          }
        default:
          hideBottomTabBar();
          return{
            state: false
          }
      }
    default:
      return{
        state: false
      }
  }
}

export { bottomTabBar_Reducer };