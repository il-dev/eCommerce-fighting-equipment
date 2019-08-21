import { formBody } from "../helpers/";
import {
  FETCH_PRODUCTS_SUCCESS,
  SUCCESS,
  INITIAL_DATA_FETCH,
  ERROR,
  START
} from "../constants";
import {
  orderToObject,
  parseQuery,
  mapRating,
  getMetadata,
  parseQueryToFilters,
  clearProducts
} from "../helpers/";

export function fetchData(limit, order, category) {
  return async (dispatch, getState) => {
    try {
      let query = `responce_type=json&site=1&action=getGoodsInSite`;
      if (limit) {
        query += `&limit=${limit}`;
      } else {
        query += `&limit=12`;
      }
      if (order != false) {
        query += `&order=${JSON.stringify(orderToObject(order))}`;
      }
      if (category) query += `&search={"category":"${category}"}`;
      const res = await fetch("https://everlast.scud.com.ua/api/", {
        method: "post",
        body: query,
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          Accept:
            "application/json, application/xml, text/plain, text/html, *.*"
        })
      });
      const json = await res.json();
      const goodsIds = Object.keys(json.result.goods).map(item =>
        item.substring(1)
      );
      const ratingRes = await fetch("https://everlast.scud.com.ua/api/", {
        method: "post",
        body: `action=getRating&responce_type=json&site=1&goods_id=${JSON.stringify(
          goodsIds
        )}`,
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          Accept:
            "application/json, application/xml, text/plain, text/html, *.*"
        })
      });
      const ratingJson = await ratingRes.json();
      const ratingMapped = mapRating(ratingJson.result);
      if (order != false) {
        dispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: { ...json.result, rating: ratingMapped },
          limit: limit,
          order: order
        });
      } else {
        dispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: { ...json.result, rating: ratingMapped },
          limit: limit
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export function initailDataFetch(query) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: INITIAL_DATA_FETCH + START
      });
      let params = {
        action: "getGoodsInSite",
        responce_type: "json",
        site: "1",
        limit: 12
      };
      if (
        query.page &&
        query.page > 1 &&
        !query.brand &&
        !query.price &&
        !query.order &&
        !query.color &&
        !query.size &&
        !query.category
      ) {
        params.offset = 12 * (query.page - 2);
      } else if (query.page && query.page > 1) {
        params.offset = 12 * (query.page - 1);
      }
      if (query.limit && params.offset && query.limit == 24) {
        params.offset *= 2;
      }
      if (query.limit && params.offset && query.limit == 36) {
        params.offset *= 3;
      }
      if (
        (!query.brand &&
          !query.price &&
          !query.order &&
          !query.color &&
          !query.size &&
          !query.category &&
          query.page == 1) ||
        (!query.search &&
          !query.price &&
          !query.order &&
          !query.color &&
          !query.size &&
          !query.category &&
          !query.page)
      ) {
        params.shuffle = "true";
      }

      if (query.category) {
        if (!params.search) params.search = {};
        params.search["category"] = query.category;
      } else if (query.id !== undefined && query.id !== "/shop/") {
        if (!params.search) params.search = {};
        params.search["category"] = parseQuery(query.id);
      }

      if (query.promos) {
        if (!params.search) params.search = {};
        params.search = { discount: true };
      }
      if (query.limit) {
        params.limit = query.limit;
      }

      if (query.size) {
        if (!params.search) params.search = {};
        params.search["size"] = query.size;
      }
      if (query.color) {
        if (!params.search) params.search = {};
        params.search["color"] = query.color;
      }
      if (query.brand) {
        if (!params.search) params.search = {};
        params.search["brand"] = query.brand;
      }
      if (query.order) {
        params.order = orderToObject(query.order);
      }
      if (query.name) {
        params.string_search = query.name;
      }
      if (query.price) {
        if (!params.search) params.search = {};
        const price_min = query.price.split("-")[0];
        const price_max = query.price.split("-")[1];
        params.search["price_min"] = price_min;
        params.search["price_max"] = price_max;
      }

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
      let ratingMapped = {};
      if (json.result.goods && Object.keys(json.result.goods).length > 0) {
        const goodsIds = Object.keys(json.result.goods).map(item =>
          item.substring(1)
        );
        const ratingRes = await fetch("https://everlast.scud.com.ua/api/", {
          method: "post",
          body: `action=getRating&responce_type=json&site=1&goods_id=${JSON.stringify(
            goodsIds
          )}`,
          mode: "cors",
          headers: new Headers({
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            Accept:
              "application/json, application/xml, text/plain, text/html, *.*"
          })
        });
        const ratingJson = await ratingRes.json();
        ratingMapped = mapRating(ratingJson.result);
      }
      const getSiteCategory = await fetch("https://everlast.scud.com.ua/api/", {
        method: "post",
        body: `action=getSiteCategory&responce_type=json&site=1`,
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          Accept:
            "application/json, application/xml, text/plain, text/html, *.*"
        })
      });
      const getSiteCategoryJson = await getSiteCategory.json();
      const metaDataOfCatalog = getMetadata(
        getSiteCategoryJson.result,
        query.category
      );
      //add to redux checked filters
      const checkedFilters = parseQueryToFilters(query);
      dispatch({
        type: INITIAL_DATA_FETCH + SUCCESS,
        payload: {
          count: json.result.count,
          goods: clearProducts(json.result.goods),
          search: json.result.search,
          query: { ...query },
          metaDataOfCatalog: metaDataOfCatalog,
          rating: ratingMapped,
          checkedFilters: checkedFilters
        }
      });
    } catch (error) {
      dispatch({
        type: INITIAL_DATA_FETCH + ERROR
      });
      console.error(error);
    }
  };
}
export const fetchProductsRequest = () => {
  return {
    type: FETCH_PRODUCTS_REQUEST
  };
};

export const fetchProductsError = () => {
  return {
    type: FETCH_PRODUCTS_ERROR
  };
};
