import {
  getItemFromStorage,
  removeItemFromStorage,
  setItemToStorage
} from "./storage";
import {
  FETCH_USER_INFO_ERROR,
  FETCH_USER_INFO_SUCCESS,
  ADD_PERSONAL_INFO,
  ADD_PAY_INFO,
  ADD_PERSONAL_ADDRESS,
  LOGOUT
} from "../constants";
import { formBody } from "../helpers";
import { getCart } from "./cart";
export function getUserInfo() {
  return async (dispatch, getState) => {
    try {
      const uuid = await dispatch(getItemFromStorage("uuid"));
      if (!uuid) return;
      const params = {
        action: "getUserByUuid",
        responce_type: "json",
        site: 1,
        uuid: uuid
      };
      const res = await fetch("https://everlast.scud.com.ua/api/", {
        method: "post",
        body: formBody(params),
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          Accept:
            "application/json, application/xml, text/plain, text/html, *.*"
        })
      });
      const json = await res.json();
      if (json.status == "failure") {
        dispatch({ type: FETCH_USER_INFO_ERROR });
        dispatch(removeItemFromStorage("auth"));
      } else {
        dispatch({ type: FETCH_USER_INFO_SUCCESS, payload: json.result });
        dispatch(setItemToStorage("auth", "true"));
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export function loginUser(phone, password) {
  return async (dispatch, getState) => {
    try {
      let params = {
        action: "login",
        responce_type: "json",
        site: 1,
        phone: phone,
        password: password
      };

      if (getState().cart.goods.length > 0) {
        const uuid = await dispatch(getItemFromStorage("uuid"));
        params.tmp_uuid = uuid;
      }
      fetch("https://everlast.scud.com.ua/api/", {
        method: "post",
        body: formBody(params),
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          Accept:
            "application/json, application/xml, text/plain, text/html, *.*"
        })
      })
        .then(r => r.json())
        .then(data => {
          if (data.status == "success") {
            dispatch(setItemToStorage("uuid", data.result.uuid));
            dispatch(setItemToStorage("auth", "true"));
            dispatch({ type: FETCH_USER_INFO_SUCCESS, payload: data.result });
            dispatch(getCart(data.result.uuid));
          } else if (data.status == "failure") {
            dispatch(setItemToStorage("auth", "false"));
            dispatch({ type: FETCH_USER_INFO_ERROR });
            const notificationOpts = {
              title: "Внимание!",
              message: "Вы ввели не верный логин или пароль",
              position: "tr"
            };
            dispatch(Notifications.error(notificationOpts));
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
}
export function loginAndGetCart(phone, password) {
  return async (dispatch, getState) => {
    if (getState().cart.goods.length > 0) {
      dispatch(setUserUuid(phone)).then(() => {
        dispatch(loginUser(phone, password));
      });
    } else {
      dispatch(loginUser(phone, password));
    }
  };
}
//if user has items in cart, renew his uuid
export function setUserUuid(phone) {
  return async (dispatch, getState) => {
    const uuid = await dispatch(getItemFromStorage("uuid"));
    try {
      const res = await fetch("https://everlast.scud.com.ua/api/", {
        method: "post",
        body: `action=setUuid&responce_type=json&site=1&uuid=${uuid}&phone=${phone}`,
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          Accept:
            "application/json, application/xml, text/plain, text/html, *.*"
        })
      });
      const json = await res.json();
    } catch (error) {
      console.error(error);
    }
  };
}
export function loginError() {
  return async (dispatch, getState) => {
    const notificationOpts = {
      title: "Внимание!",
      message: "Вы ввели не верный логин или пароль",
      position: "tr"
    };
    dispatch(Notifications.error(notificationOpts));
  };
}
const getUuid = () => {
  try {
    const params = {
      action: "getUuid",
      responce_type: "json"
    };
    fetch("https://everlast.scud.com.ua/api/", {
      method: "post",
      body: formBody(params),
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        Accept: "application/json, application/xml, text/plain, text/html, *.*"
      })
    })
      .then(r => r.json())
      .then(data => {
        localStorage.setItem("uuid", JSON.stringify(data.result));
      });
  } catch (error) {
    console.log(error);
  }
};
// GENERATE UUID
export const randomUuid = () => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const length = 30;
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
export const addPersonalInfo = info => ({
  type: ADD_PERSONAL_INFO,
  payload: info
});
export const addPayInfo = (id, description) => ({
  type: ADD_PAY_INFO,
  payload: { id, description }
});
export const addPersonalAddress = (currentDelivery, address, description) => ({
  type: ADD_PERSONAL_ADDRESS,
  payload: { currentDelivery, address, description }
});
export const logOut = () => ({
  type: LOGOUT
});
