// reducer for storing global states
const globalReducerInitState = {
  lang: 'english', // LISTLIST-TODO: english | french
  noticeMessage: {
    'type': '', // success | danger
    'message': '',
  },
  searchArea: {
    region: '',
    city: '',
    lat: 0,
    long: 0,
    areaDistance: 0,// unit: km
  }
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
    case 'setSearchArea':
      return{
        ...state,
        searchArea: action.value
      }
    default:
      return state;
  }
}

export { globalReducer };
