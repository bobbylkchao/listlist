//reducer for network connection state
const stateInit = {
  state: true
};

const network_Reducer = (state = stateInit, action) => {
  switch(action.type){
    case 'setNetworkState':
      return {
        state: {
          state: action.value,
        }
      }
    default:
      return { 
        state: stateInit
      }
  }
}

export { network_Reducer }