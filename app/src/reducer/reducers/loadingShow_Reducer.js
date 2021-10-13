//reducer for loading visible
const stateInit = {
  open: false,
  message: '',
  duration: 0,
  spinner: ''
};

const loadingShow_Reducer = (state = stateInit, action) => {
  switch(action.type){
    case 'showLoading':
      return{
        state: {
          open: true,
          message: action.value.message,
          duration: action.value.duration,
          spinner: action.value.spinner
        }
      }
    case 'hideLoading':
      return {
        state: stateInit
      }
    default:
      return { 
        state: stateInit
      }
  }
}

export { loadingShow_Reducer }