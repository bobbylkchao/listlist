export const setRedux = (data) => {
  return (dispatch) => {
    dispatch({
      type: "setRedux",
      data: data
    });
  }
}