// reducer for storing global states
const globalReducerInitState = {
  lang: 'english', // LISTLIST-TODO: english | french
  noticeMessage: {
    'type': '', // success | danger
    'message': '',
  },
  searchArea: {
    city: 'Winnipeg',
    lat: 49.893910,
    long: -97.146480,
    areaDistance: 50,// unit: km
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
