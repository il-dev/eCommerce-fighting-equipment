import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_MOBILE_SORT,
  OPEN_MOBILE_FILTER,
  OPEN_MOBILE_MENU,
  OPEN_MOBILE_CATEGORY
} from "../constants";

export default (state = {}, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, drawerIsOpen: true };
    case CLOSE_DRAWER:
      return { ...state, drawerIsOpen: false };
    case OPEN_MOBILE_SORT:
      return {
        ...state,
        drawerIsOpen: true,
        sortIsOpen: true,
        filterIsOpen: false,
        menuIsOpen: false
      };
    case OPEN_MOBILE_FILTER:
      return {
        ...state,
        drawerIsOpen: true,
        sortIsOpen: false,
        filterIsOpen: true,
        menuIsOpen: false,
        categoryIsOpen: false
      };
    case OPEN_MOBILE_MENU:
      return {
        ...state,
        drawerIsOpen: true,
        sortIsOpen: false,
        filterIsOpen: false,
        menuIsOpen: true,
        categoryIsOpen: false
      };
    case OPEN_MOBILE_CATEGORY:
      return {
        ...state,
        drawerIsOpen: true,
        sortIsOpen: false,
        filterIsOpen: false,
        menuIsOpen: false,
        categoryIsOpen: true
      };
    default:
      return state;
  }
};
