//reducer for alert visible
const stateInit = {
  open: false,
  content: '',
  title: '',
  okText: '',
  okEvent: function(){},
  cancelShow: false,
  cancelText: '取消',
  cancelEvent: function(){}
};

const alertShow_Reducer = (state = stateInit, action) => {
  switch(action.type){
    case 'showAlert':
      return{
        state: {
          open: true,
          content: action.value.content,
          title: action.value.title,
          okText: action.value.okText,
          okEvent: action.value.okEvent,
          cancelShow: action.value.cancelShow,
          cancelText: action.value.cancelText,
          cancelEvent: action.value.cancelEvent
        }
      }
    case 'hideAlert':
      return { 
        state: stateInit
      }
    default:
      return { 
        state: stateInit
      }
  }
}

export { alertShow_Reducer }