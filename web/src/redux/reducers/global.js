// reducer for storing global states
const globalReducerInitState = {
  lang: 'english', // LISTLIST-TODO: english | french
  noticeMessage: {
    'type': '', // success | danger
    'message': '',
  },
};

const globalReducer = (state = globalReducerInitState, action) => {
  switch(action.type){
    case 'setGlobalLang':
      return{
        ...state,
        lang: action.value
      }
    case 'setGlobalNoticeMessage':
      return{
        ...state,
        noticeMessage: action.value
      }
    default:
      return state;
  }
}

export { globalReducer };
