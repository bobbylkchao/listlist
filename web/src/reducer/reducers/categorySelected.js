// reducer for storing currently selected category
const categoryCurrentSelected = {
  id: 0,
  name: 'All Categories',
};

const categorySelected = (state = categoryCurrentSelected, action) => {
  switch(action.type){
    case 'setCategorySelected':
      return{
        state: action.value
      }
    default:
      return state;
  }
}

export { categorySelected };
