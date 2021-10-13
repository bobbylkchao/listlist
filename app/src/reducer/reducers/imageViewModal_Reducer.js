//reducer for image view modal visible

const stateInit = {
  visible: false,
  images: [],
  origin: 'remote',
};

const imageViewModal_Reducer = (state = stateInit, action) => {
  switch(action.type){
    case 'showImageViewModal':
      return{
        state: {
          visible: true,
          images: action.value,
          origin: action.imageOrigin,
        }
      }
    case 'hideImageViewModal':
      return { 
        state: stateInit
      }
    default:
      return { 
        state: stateInit
      }
  }
}

export { imageViewModal_Reducer }
