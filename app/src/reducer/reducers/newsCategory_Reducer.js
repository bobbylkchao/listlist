//reducer for news category
const stateInit = {
  id: 0
};

const newsCategory_Reducer = (state = stateInit, action) => {
  switch(action.type){
    case 'changeNewsCategory':
      return {
        state: {
          id: action.value,
        }
      }
    default:
      return { 
        state: stateInit
      }
  }
}

export { newsCategory_Reducer }