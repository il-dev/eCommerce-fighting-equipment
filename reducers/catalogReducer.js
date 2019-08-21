import {
  FETCH_FILTERS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_FILTERS_SUCCESS,
  INITIAL_DATA_FETCH,
  SUCCESS,
  ERROR,
  START,
  INITIAL_DATA
} from "../constants";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_FILTERS_SUCCESS:
      return {
        ...state,
        products: action.payload.goods,
        productsCoutn: action.payload.count,
        query: action.query,
        rating: action.payload.rating,
        loading: false,
        metaDataOfCatalog: {}
      };
    case INITIAL_DATA_FETCH + SUCCESS:
      return {
        ...state,
        products: action.payload.goods,
        productsCoutn: action.payload.count,
        query: action.payload.query,
        rating: action.payload.rating,
        metaDataOfCatalog: action.payload.metaDataOfCatalog,
        loading: false
      };
    case INITIAL_DATA_FETCH + ERROR:
      return {
        ...state,
        products: {},
        productsCoutn: 0,
        query: {},
        rating: {},
        loading: false
      };
    case INITIAL_DATA_FETCH + START:
      return {
        ...state,
        loading: true
      };
    case FETCH_FILTERS + START:
      return {
        ...state,
        loading: true
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.goods,
        productsCoutn: action.payload.count,
        rating: action.payload.rating,
        query: { ...state.query, limit: action.limit, order: action.order }
      };
    case INITIAL_DATA:
      return {
        ...state,
        initialData: {
          breadcrumbs: action.payload.breadcrumbs,
          siteCategory: action.payload.siteCategory
        }
      };
    // case INITIAL_DATA:
    //   return { ...state, initialData: action.payload };
    default:
      return state;
  }
};
