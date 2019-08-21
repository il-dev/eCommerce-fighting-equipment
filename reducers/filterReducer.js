import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  ADD_BRAND_FILTER,
  ADD_CATEGORY_FILTER,
  FETCH_FILTERS_SUCCESS,
  FETCH_FILTERS,
  ADD_RANGE_FILTER,
  ADD_COLOR_FILTER,
  ADD_SIZE_FILTER,
  ADD_CHECKED_FILTERS,
  INITIAL_DATA,
  INITIAL_DATA_FETCH,
  RETURN_INITIAL_FILTER_DATA,
  SUCCESS,
  START,
  ERROR
} from "../constants";
const initialState = {
  brandFilter: {},
  categoryFilter: {},
  colorFilter: {},
  rangeFilterValue: {},
  sizeFilter: {},
  returnToInitialState: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case FETCH_PRODUCTS_SUCCESS:
    // 	return action.payload;
    case ADD_CHECKED_FILTERS:
      return {
        ...state,
        brandFilter: { ...state.brandFilter, ...action.payload.brandFilter },
        categoryFilter: {
          ...state.categoryFilter,
          ...action.payload.categoryFilter
        },
        colorFilter: { ...state.colorFilter, ...action.payload.colorFilter },
        sizeFilter: { ...state.sizeFilter, ...action.payload.sizeFilter },
        rangeFilterValue: {
          ...state.rangeFilterValue,
          ...action.payload.rangeFilterValue
        }
      };
    case ADD_BRAND_FILTER:
      return { ...state, brandFilter: { ...state.brandFilter, ...action.id } };
    case ADD_CATEGORY_FILTER:
      return {
        ...state,
        categoryFilter: { ...state.categoryFilter, ...action.id }
      };
    case ADD_COLOR_FILTER:
      return { ...state, colorFilter: { ...state.colorFilter, ...action.id } };
    case ADD_SIZE_FILTER:
      return { ...state, sizeFilter: { ...state.sizeFilter, ...action.id } };
    case ADD_RANGE_FILTER:
      return {
        ...state,
        rangeFilterValue: { ...state.rangeFilterValue, ...action.range }
      };
    case FETCH_FILTERS_SUCCESS:
      return {
        ...state,
        filterData: action.payload.search,
        query: action.query,
        loading: false,
        returnToInitialState: false,
        metaDataOfCatalog: {}
      };
    case RETURN_INITIAL_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
        loading: false,
        ...initialState
      };
    case FETCH_FILTERS + START:
      return {
        ...state,
        loading: true
      };
    case FETCH_FILTERS + ERROR:
      return {
        ...state,
        loading: false
      };
    case INITIAL_DATA:
      return {
        ...state,
        initialFilterData: {
          sizes: action.payload.sizes,
          brands: action.payload.brands,
          brand: action.payload.brand,
          stores: action.payload.stores,
          price: action.payload.price,
          colors: action.payload.colors,
          category_count: action.payload.filterData.category_count,
          brand_count: action.payload.filterData.brand_count,
          size_count: action.payload.filterData.size_count,
          color_count: action.payload.filterData.color_count,
          price: action.payload.price
        }
        // filterData: {
        //   category_count: action.payload.filterData.category_count,
        //   brand_count: action.payload.filterData.brand_count,
        //   size_count: action.payload.filterData.size_count,
        //   color_count: action.payload.filterData.color_count,
        //   price: action.payload.price
        // }
      };
    case INITIAL_DATA_FETCH + SUCCESS:
      return {
        ...state,
        brandFilter: { ...action.payload.checkedFilters.brandFilter },
        colorFilter: { ...action.payload.checkedFilters.colorFilter },
        sizeFilter: { ...action.payload.checkedFilters.sizeFilter },
        categoryFilter: { ...action.payload.checkedFilters.categoryFilter },
        rangeFilterValue: { ...action.payload.checkedFilters.rangeFilterValue },
        filterData: action.payload.search,
        query: action.payload.query,
        returnToInitialState: false
      };
    case INITIAL_DATA_FETCH + ERROR:
      return {
        ...state,
        brandFilter: {},
        colorFilter: {},
        sizeFilter: {},
        categoryFilter: {},
        rangeFilterValue: {},
        filterData: {},
        query: {}
      };
    default:
      return state;
  }
};
