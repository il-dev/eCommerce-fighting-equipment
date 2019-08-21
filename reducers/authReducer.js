import {
  LOGOUT,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_ERROR
} from "../constants";

export default (state = { auth: false, memoryStorage: {} }, action) => {
  switch (action.type) {
    case LOGOUT:
      return { ...state, auth: false, uuid: false };
    case FETCH_USER_INFO_SUCCESS:
      return { ...state, auth: true, uuid: action.payload.uuid };
    case FETCH_USER_INFO_ERROR:
      return { ...state, auth: false };
    case "SET_ITEM_TO_STORAGE":
      return {
        ...state,
        memoryStorage: {
          ...state.memoryStorage,
          [action.payload.key]: action.payload.value
        }
      };
    default:
      return state;
  }
};
