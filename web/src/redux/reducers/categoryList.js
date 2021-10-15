// reducer for storing categories 
const categoriesList = [] | {};

const categoryList = (state = categoriesList, action) => {
  switch(action.type){
    case 'saveCategories':
      return{
        state: action.value
      }
    default:
      return state;
  }
}

export {
  categoryList,
}
