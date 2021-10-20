// reducer for theme
const themeInit = {
  darkmode: false
};

const theme = (state = themeInit, action) => {
  switch(action.type){
    case 'enableDarkMode':
      return{
        state: {
          darkmode: true
        }
      }
    default:
      return state;
  }
}

export {
  theme,
}
