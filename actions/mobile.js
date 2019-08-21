export const openDrawer = () => {
  return async dispatch => {
    dispatch({
      type: OPEN_DRAWER
    });
  };
};
export const closeDrawer = () => {
  return async dispatch => {
    dispatch({
      type: CLOSE_DRAWER
    });
  };
};
export const openMobileFilter = () => {
  return async dispatch => {
    dispatch({
      type: OPEN_MOBILE_FILTER
    });
  };
};
export const openMobileSort = () => {
  return async dispatch => {
    dispatch({
      type: OPEN_MOBILE_SORT
    });
  };
};
export const openMobileMenu = () => {
  return async dispatch => {
    dispatch({
      type: OPEN_MOBILE_MENU
    });
  };
};
export const openMobilCategory = () => {
  return async dispatch => {
    dispatch({
      type: OPEN_MOBILE_CATEGORY
    });
  };
};
