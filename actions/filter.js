import {
  ADD_BRAND_FILTER,
  ADD_CATEGORY_FILTER,
  ADD_COLOR_FILTER,
  ADD_SIZE_FILTER,
  ADD_RANGE_FILTER,
  FETCH_FILTERS,
  FETCH_FILTERS_SUCCESS,
  START,
  ERROR,
  RETURN_INITIAL_FILTER_DATA,
  ADD_CHECKED_FILTERS
} from "../constants";
import { mapRating } from "../helpers";

export const addBrandFilter = id => ({
  type: ADD_BRAND_FILTER,
  id
});
export const addCategoryFilter = id => ({
  type: ADD_CATEGORY_FILTER,
  id
});
export const addColorFilter = id => ({
  type: ADD_COLOR_FILTER,
  id
});
export const addSizeFilter = id => ({
  type: ADD_SIZE_FILTER,
  id
});
export const addRangeFilter = range => ({
  type: ADD_RANGE_FILTER,
  range
});
export function fetchFilters(query) {
  return async (dispatch, getState) => {
    const searchString = getSearchString(getState().filter);
    try {
      dispatch({
        type: FETCH_FILTERS + START
      });
      const res = await fetch("https://everlast.scud.com.ua/api/", {
        method: "post",
        body: `action=getGoodsInSite&responce_type=json&site=1&limit=12&search={${searchString}}`,
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
      // push pagination to first page
      let newQuery = Object.assign({}, query);
      if (newQuery.page) newQuery.page = 1;
      dispatch({
        type: FETCH_FILTERS_SUCCESS,
        payload: { ...json.result, rating: ratingMapped },
        query: newQuery
      });
    } catch (error) {
      dispatch({
        type: FETCH_FILTERS + ERROR
      });
      console.error(error);
    }
  };
}
// CLEAR FILTER IF ROUTER CHANGES
export const returnInitialFilterData = url => {
  return async (dispatch, getState) => {
    if (url == "/" && !getState().filter.returnToInitialState) {
      dispatch({
        type: RETURN_INITIAL_FILTER_DATA,
        payload: getState().filter.initialFilterData
      });
    }
  };
};
export const addInitialFilter = checkedFilter => ({
  type: ADD_CHECKED_FILTERS,
  payload: checkedFilter
});

const getSearchString = filter => {
  let result = "";
  const {
    brandFilter,
    categoryFilter,
    colorFilter,
    rangeFilterValue,
    sizeFilter
  } = filter;
  const brandParams = getParams(brandFilter);
  const colorParams = getParams(colorFilter);
  const sizeParams = getParams(sizeFilter);
  const categoryParams = getParams(categoryFilter);
  if (brandParams.length > 0) result += `"brand":"${brandParams}",`;
  if (colorParams.length > 0) result += `"color":"${colorParams}",`;
  if (sizeParams.length > 0) result += `"size":"${sizeParams}",`;
  if (categoryParams.length > 0) result += `"category":"${categoryParams}",`;
  if (rangeFilterValue.min) result += `"price_min":"${rangeFilterValue.min}",`;
  if (rangeFilterValue.max) result += `"price_max":"${rangeFilterValue.max}",`;
  result = result.substring(0, result.length - 1);
  return result;
};
const getParams = filter => {
  let result = [];
  Object.keys(filter).forEach(key => {
    if (filter[key].isChecked) result.push(key);
  });
  return result.join(",");
};
