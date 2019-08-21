import { getItemFromStorage, setItemToStorage } from "./storage";
import { randomUuid } from "./user";
import {
  SET_CART,
  SUCCESS,
  FETCH_CART,
  DELETE_ITEM_IN_CART,
  SET_ORDER,
  GET_LIQPAY,
  ADD_TO_CART,
  OPEN_CART,
  CLOSE_CART
} from "../constants";
import { formBody } from "../helpers";

export function setCart(id) {
  return async (dispatch, getState) => {
    let uuid = await dispatch(getItemFromStorage("uuid"));
    if (!uuid) {
      uuid = randomUuid();
      await dispatch(setItemToStorage("uuid", uuid));
    }
    try {
      const params = {
        action: "setCart",
        responce_type: "json",
        site: "1",
        uuid: uuid,
        goods_id: id,
        amount: 1
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
      dispatch({
        type: SET_CART + SUCCESS,
        payload: {
          goods: json.result.goods,
          inStock: json.result.in_stock || {},
          reserved: json.result.in_reserv || {}
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
}
/* GET SITE CART */
export function getCart(uuidFromServer) {
  return async (dispatch, getState) => {
    try {
      let uuid = await dispatch(getItemFromStorage("uuid"));
      if (!uuid && !uuidFromServer) return;
      if (uuidFromServer != uuid && uuidFromServer != undefined) {
        uuid = uuidFromServer;
      }

      const params = {
        action: "getCart",
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
      dispatch({
        type: FETCH_CART + SUCCESS,
        payload: {
          goods: json.result.goods,
          inStock: json.result.in_stock || {},
          reserved: json.result.in_reserv || {}
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
}
/* END GET SITE CART */
/* DELETE ITEM IN CART */
export function deleteItemCart(id) {
  return async (dispatch, getState) => {
    const uuid = await dispatch(getItemFromStorage("uuid"));
    try {
      const params = {
        action: "delCart",
        responce_type: "json",
        site: "1",
        uuid: uuid,
        goods_id: id
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
      dispatch({
        type: DELETE_ITEM_IN_CART + SUCCESS,
        payload: {
          goods: json.result.goods,
          inStock: json.result.in_stock || {},
          reserved: json.result.in_reserv || {}
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
}
/* DELETE ITEM IN CART */
/* UPDATE CART */
export function updateCart(id, value) {
  return async (dispatch, getState) => {
    const uuid = await dispatch(getItemFromStorage("uuid"));
    try {
      const params = {
        action: "setCart",
        responce_type: "json",
        site: "1",
        uuid: uuid,
        goods_id: id,
        amount: value
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
      dispatch({
        type: SET_CART + SUCCESS,
        payload: {
          goods: json.result.goods,
          inStock: json.result.in_stock || {},
          reserved: json.result.in_reserv || {}
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
}
/* UPDATE CART */
export function setOrder(
  fio,
  phone,
  email,
  delivery,
  address,
  payment,
  comment,
  goodsToSend
) {
  return async (dispatch, getState) => {
    const uuid = await dispatch(getItemFromStorage("uuid"));
    try {
      const res = await fetch("https://everlast.scud.com.ua/api/", {
        method: "post",
        body: `action=setOrder&responce_type=json&site=1&uuid=${uuid}&fio=${fio}&phone=${phone}&address=${address}&email=${email}&comment=${comment}&delivery=${delivery}&payment=${payment}&goods=${JSON.stringify(
          goodsToSend
        )}`,
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          Accept:
            "application/json, application/xml, text/plain, text/html, *.*"
        })
      });
      const json = await res.json();
      if (json.status == "success") {
        const { order_id, total_price } = json.result.order;
        dispatch({
          type: SET_ORDER + SUCCESS,
          payload: { orderId: order_id, sum: total_price }
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
export function getLiqpay(order_id, total_price) {
  return async (dispatch, getState) => {
    const uuid = await dispatch(getItemFromStorage("uuid"));
    try {
      const res = await fetch("https://everlast.scud.com.ua/api/", {
        method: "post",
        body: `action=getLiqpay&responce_type=json&site=1&uuid=${uuid}&order_id=${order_id}&order_sum=${total_price}&result_url="https://everlast-original.com.ua/checkout/order-done/${order_id}/"`,
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
          type: GET_LIQPAY + SUCCESS,
          payload: json.result
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}
export const setOrderDone = (order_id, total_price) => {
  return async dispatch => {
    dispatch({
      type: SET_ORDER + SUCCESS,
      payload: { orderId: order_id, sum: total_price }
    });
  };
};

export function setCartHistory(orderId, goods) {
  return async (dispatch, getState) => {
    const uuid = await dispatch(getItemFromStorage("uuid"));
    try {
      const res = await fetch("https://everlast.scud.com.ua/api/", {
        method: "post",
        body: `action=setCartHistory&responce_type=json&site=1&uuid=${uuid}&order_id=${orderId}&goods=${JSON.stringify(
          goods
        )}`,
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

export function setOrderDoneAndGetLiqPay(
  order_id,
  total_price,
  payment,
  goodsToSend
) {
  return async (dispatch, getState) => {
    if (payment == 9) {
      dispatch({
        type: GET_LIQPAY + START
      });
      dispatch(setOrderDone(order_id, total_price)).then(() => {
        dispatch(getLiqpay(order_id, total_price));
      });
    } else {
      dispatch(setOrderDone(order_id, total_price));
    }
    dispatch(setCartHistory(order_id, goodsToSend));
  };
}
export const addToCart = product => ({
  type: ADD_TO_CART,
  product
});
export const openCart = () => ({
  type: OPEN_CART,
  payload: true
});
export const closeCart = () => ({
  type: CLOSE_CART,
  payload: false
});
