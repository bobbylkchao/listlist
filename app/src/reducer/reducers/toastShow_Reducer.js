//reducer for toast visible
const stateInit = {
  open: false,
  message: '',
  color: 'primary',
  header: '',
  position: 'bottom',
  duration: 0,
  closeEvent: function(){}
};

const toastShow_Reducer = (state = stateInit, action) => {
  switch(action.type){
    case 'showToast':
      return{
        state: {
          open: true,
          message: action.value.message,
          color: action.value.color,
          header: action.value.header,
          position: action.value.position,
          duration: action.value.duration,
          closeEvent: action.value.closeEvent
        }
      }
    case 'hideToast':
      return { 
        state: stateInit
      }
    default:
      return { 
        state: stateInit
      }
  }
}

export { toastShow_Reducer }