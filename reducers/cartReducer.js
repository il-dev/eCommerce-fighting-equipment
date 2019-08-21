import {
  ADD_TO_CART,
  SET_CART_HISTORY,
  FAIL,
  FETCH_CART,
  SUCCESS,
  SET_CART,
  DELETE_ITEM_IN_CART,
  OPEN_CART,
  CLOSE_CART,
  GET_LIQPAY_HISTORY,
  LOGOUT,
  SET_ORDER
} from "../constants";

export default (
  state = { goods: [], reserved: {}, inStock: {}, modalIsOpen: false },
  action
) => {
  switch (action.type) {
    case FETCH_CART + SUCCESS:
      return { ...state, ...action.payload };
    case SET_CART + SUCCESS:
      return { ...state, ...action.payload };
    case DELETE_ITEM_IN_CART + SUCCESS:
      return { ...state, ...action.payload };
    case OPEN_CART:
      return { ...state, modalIsOpen: action.payload };
    case CLOSE_CART:
      return { ...state, modalIsOpen: action.payload };
    case LOGOUT:
      return { ...state, goods: [] };
    // case SET_ORDER + SUCCESS:
    //   return { ...state, goods: [] };
    // case FETCH_USER_INFO_SUCCESS:
    //   return { ...state, auth: true };
    case SET_CART_HISTORY + FAIL:
      return { ...state, [action.product.id]: { ...action.product } };
    default:
      return state;
  }
};
