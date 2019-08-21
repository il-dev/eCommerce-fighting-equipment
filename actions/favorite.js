import { getItemFromStorage } from "./storage";
import { GET_FAVORITES, SUCCESS, DEL_FAVORITES } from "../constants";
import { mapFavorites } from "../helpers";
import Notifications from "react-notification-system-redux";

export function getFavorites() {
  return async (dispatch, getState) => {
    const uuid = await dispatch(getItemFromStorage("uuid"));
    try {
      const res = await fetch("https://everlast.scud.com.ua/api/", {
        method: "post",
        body: `action=getFavorite&responce_type=json&site=1&uuid=${uuid}`,
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          Accept:
            "application/json, application/xml, text/plain, text/html, *.*"
        })
      });
      const json = await res.json();
      dispatch({
        type: GET_FAVORITES + SUCCESS,
        payload: mapFavorites(json.result.goods)
      });
    } catch (error) {
      console.error(error);
    }
  };
}
export function delFavorites(id) {
  return async (dispatch, getState) => {
    const uuid = await dispatch(getItemFromStorage("uuid"));
    try {
      const res = await fetch("https://everlast.scud.com.ua/api/", {
        method: "post",
        body: `action=delFavorite&responce_type=json&site=1&uuid=${uuid}&article_id=${id}`,
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          Accept:
            "application/json, application/xml, text/plain, text/html, *.*"
        })
      });
      const json = await res.json();
      if (json.status == "success") {
        dispatch({
          type: DEL_FAVORITES + SUCCESS,
          payload: { id }
        });
        const notificationOpts = {
          title: "Поздравляем!",
          message: "Товар успешно удален",
          position: "tr"
        };
        dispatch(Notifications.success(notificationOpts));
      }
    } catch (error) {
      console.error(error);
    }
  };
}
export function addToFavorites(article_id) {
  return async (dispatch, getState) => {
    try {
      if (getState().auth.auth == false) {
        const notificationOpts = {
          title: "Ошибка!",
          message: "Войдите в систему, что бы добавить товар в избранное",
          position: "tr"
        };
        dispatch(Notifications.error(notificationOpts));
        return;
      }

      const uuid = await dispatch(getItemFromStorage("uuid"));
      const res = await fetch("https://everlast.scud.com.ua/api/", {
        method: "post",
        body: `action=setFavorite&responce_type=json&site=1&uuid=${uuid}&article_id=${article_id}`,
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          Accept:
            "application/json, application/xml, text/plain, text/html, *.*"
        })
      });
      const json = await res.json();
      if (json.status == "success") {
        const notificationOpts = {
          title: "Поздравляем!",
          message: "Товар успешно добавлен",
          position: "tr"
        };
        dispatch(Notifications.success(notificationOpts));
        const getFavorites = await fetch("https://everlast.scud.com.ua/api/", {
          method: "post",
          body: `action=getFavorite&responce_type=json&site=1&uuid=${uuid}`,
          mode: "cors",
          headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            Accept:
              "application/json, application/xml, text/plain, text/html, *.*"
          })
        });
        const jsonFavorites = await getFavorites.json();
        dispatch({
          type: GET_FAVORITES + SUCCESS,
          payload: mapFavorites(jsonFavorites.result.goods)
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}
