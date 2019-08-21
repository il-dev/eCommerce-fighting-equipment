// LOCAL OR MEMORY STORAGE
function isSupported() {
  try {
    const key = "__some_random_key_you_are_not_going_to_use__";
    localStorage.setItem(key, key);
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

export const setItemToStorage = (key, value) => {
  return async dispatch => {
    if (isSupported()) {
      localStorage.setItem(key, value);
    } else {
      dispatch({
        type: "SET_ITEM_TO_STORAGE",
        payload: { key, value }
      });
    }
  };
};
export const getItemFromStorage = key => {
  return async (dispatch, getState) => {
    if (isSupported()) {
      return localStorage.getItem(key);
    } else if (getState().auth.memoryStorage.hasOwnProperty(key)) {
      return getState().auth.memoryStorage[key];
    }
    return null;
  };
};
export const removeItemFromStorage = key => {
  return async (dispatch, getState) => {
    if (isSupported()) {
      localStorage.removeItem(key);
    } else if (getState().auth.memoryStorage[key]) {
      dispatch({
        type: "DELETE_ITEM_FROM_STORAGE",
        payload: { key: key }
      });
    }
  };
};
