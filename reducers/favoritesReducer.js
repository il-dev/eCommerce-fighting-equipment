import { GET_FAVORITES, SUCCESS, LOGOUT, DEL_FAVORITES } from "../constants";

export default (state = { items: [] }, action) => {
  switch (action.type) {
    case LOGOUT:
      return { ...state, items: [] };
    case GET_FAVORITES + SUCCESS:
      return { ...state, items: action.payload };
    case DEL_FAVORITES + SUCCESS:
      return {
        ...state,
        items: state.items.filter(item => item.id != action.payload.id)
      };
    default:
      return state;
  }
};
